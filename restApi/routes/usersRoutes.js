const { Router } = require('express');
const fs = require('fs');
const sha256 = require('js-sha256');
const validator = require("email-validator")
const Quiz = require('../models/Quiz');
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
    let err = {state: false, message: []};
    let user;
    if (userName.length < 4) {
      err.state = true;
      err.message.push('имя минимум 4 символа');
    }
    if (password.length < 6 || password.length > 24) {
      err.state = true;
      err.message.push('пароль от 6 до 24 символов');
    }
    if (validator.validate(email)) {
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
      const user = await Users.findOne({ userName: req.query.userName, password: sha256(req.query.password) })
      if (user) {
        res.status(200).json({ user, isAuth: true })
      } else {
        res.status(200).json({ isAuth: false })
      }
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;