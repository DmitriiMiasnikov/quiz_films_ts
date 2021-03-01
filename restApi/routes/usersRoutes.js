const { Router } = require('express');
const fs = require('fs');
const sha256 = require('js-sha256');
const validator = require("email-validator");
const Users = require('./../models/Users');
const router = Router();

// регистрация нового пользователя
// /users/registration
router.post(
  '/registration',
  async (req, res) => {
    const userName = req.query.userName;
    const password = req.query.password;
    const email = req.query.email;
    let err = { state: false, message: [] };
    let user;
    if (userName.length < 4) {
      err.state = true;
      err.message.push('имя минимум 4 символа');
    }
    if (password.length < 6 || password.length > 24) {
      err.state = true;
      err.message.push('пароль от 6 до 24 символов');
    }
    if (!validator.validate(email)) {
      err.state = true;
      err.message.push('некорректный адрес почты');
    }
    if (!err.state) {
      const usersLength = await Users.find({}).countDocuments();
      user = new Users({
        userId: usersLength + 1,
        userName: req.query.userName,
        password: sha256(req.query.password),
        email: req.query.email,
      })
      await user.save();
    }
    res.status(200).json({ user, err, isAuth: !err.state })
  }
)

// авторизация пользователя
// /users/authorization
router.get(
  '/authorization',
  async (req, res) => {
    try {
      const userName = req.query.userName;
      const password = req.query.password;
      let err = { state: false, message: [] };
      const user = await Users.findOne({ userName: userName, password: sha256(password) }, 'userId userName email')
      if (!user) {
        err.state = true;
        err.message.push('неверное имя или пароль');
      }
      res.status(200).json({ user, isAuth: !err.state || Boolean(user) })
    } catch (e) {
      console.log(e)
    }
  }
)

// инфа о пользователе
// /users/id/:id
router.get(
  '/id/:id',
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = await Users.findOne({ userId: id }, 'userId userName email');
      res.status(200).json({ user })
    } catch (e) {
      console.log(e)
    }
  }
)

// // проверка авторизован ли
// // /users/
// router.get(
//   '/isAuth/',
//   async (req, res) => {
//     try {
//       let isAuth = false;
//       let user;

//       // req.session.numbers = req.session.numbers + 1 || 1
//       // console.log(req.session.numbers);
//       // console.log(req.sessionID);
//       // res.send('vsits' + req.session.numbers);

//       // if (!req.cookies.cookieBad) {
//       //   let items = [];
//       //   res.cookie('cookieBad', items, {
//       //     expires: new Date(Date.now() + 999999),
//       //     httpOnly: true,

//       //   });
//       // }
//       if (isAuth) {
//         const id = Number(req.params.id);
//         user = await Users.findOne({ userId: id }, 'userId userName email');
//       }
//       res.status(200).json({ user, isAuth })
//     } catch (e) {
//       console.log(e)
//     }
//   }
// )

module.exports = router;