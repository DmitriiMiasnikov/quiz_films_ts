const { Router } = require('express');
const router = Router();
const sha256 = require('js-sha256');
const Users = require('./../models/Users');
const Animation = require('./../models/Animation');
const Manga = require('./../models/Manga');
const Ranobe = require('./../models/Ranobe');

// получить всех пользователей
// /users/
router.get(
  '/',
  async (req, res) => {
    const users = await Users.find({}, 'animation animationRating userName userId');
    res.status(200).json({ users })
  }
)

// получить первых 5 пользователей для меня
// /users/menu
router.get(
  '/menu',
  async (req, res) => {
    const usersAll = await Users.find({}, 'animation animationRating userName userId');
    let users = [].concat(usersAll.slice(0, 5))
    res.status(200).json({ users })
  }
)

// регистрация нового пользователя
// /users/registration
router.post(
  '/registration',
  async (req, res) => {
    const AllUsers = await Users.find({});
    const user = new Users({
      userId: AllUsers.length + 1,
      userName: req.query.userName,
      password: sha256(req.query.password),
      email: req.query.email,
    })
    await user.save();
    res.status(200).json({ user, isAuth: true })
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

// получить информация о выбранном пользователе
// /users/id/:id
router.get(
  '/id/:userId',
  async (req, res) => {
    const userId = req.params.userId || 0;
    try {
      const user = await Users.findOne({ userId: userId }, 
        'animation ranobe manga animationRating mangaRating ranobeRating userName userId')
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить списки по выбранному пользователю
// users/id/listItems/:id
router.get(
  '/id/listItems/:userId',
  async (req, res) => {
    const userId = req.params.userId || 0;
    try {
      const user = await Users.findOne({ userId: userId }, 'animation ranobe manga');
      let userListItems = {};
      let userListItemsFive = {};
      const listNames = ['animation', 'manga', 'ranobe'];
      let userListItemsRest = {};
      let countUserList = {};
      for (const j in listNames) {
        userListItems[listNames[j]] = {};
        userListItemsRest[listNames[j]] = {};
        userListItemsFive[listNames[j]] = {};
        countUserList[listNames[j]] = {};
        for (const i in Object.keys(user[listNames[j]])) {
          const currentItem = Object.keys(user[listNames[j]])[i];
          if (listNames[j] === 'animation') {
            userListItems[listNames[j]][currentItem] = await Animation.find({ animationId: { $in: user[listNames[j]][currentItem] } });
          } else if (listNames[j] === 'manga') {
            userListItems[listNames[j]][currentItem] = await Manga.find({ mangaId: { $in: user[listNames[j]][currentItem] } });
          } else if (listNames[j] === 'ranobe') {
            userListItems[listNames[j]][currentItem] = await Ranobe.find({ ranobeId: { $in: user[listNames[j]][currentItem] } });
          }
          countUserList[listNames[j]][currentItem] = userListItems[listNames[j]][currentItem].length;
          userListItemsRest[listNames[j]][currentItem] = userListItems[listNames[j]][currentItem].slice(11).length;
          userListItemsFive[listNames[j]][currentItem] = userListItems[listNames[j]][currentItem].slice(0, 11);
        }
      }
      res.status(200).json({ userListItemsFive, userListItems, userListItemsRest, countUserList });
    } catch (e) {
      console.log(e)
    }
  }
)

// добавить/убрать аниме в просмотренное/очередь
// users/userList/id/:id
router.put(
  '/userList/id/:userId',
  async (req, res) => {
    const userId = req.params.userId || 1;
    const list = req.query.list;
    const id = Number(req.query.id) || 1;
    const typeButton = req.query.type;
    try {
        const userToUpdate = await Users.findOne({ userId: userId }, `${list}`);
        let userListUpdate = userToUpdate[list];
        if (userListUpdate[typeButton].includes(id)) {
          userListUpdate[typeButton].splice(userListUpdate[typeButton].indexOf(id), 1);
        } else {
          if (typeButton === 'done' && (userListUpdate['queue'].includes(id))) {
            userListUpdate['queue'].splice(userListUpdate['queue'].indexOf(id), 1);
          } else if (typeButton === 'queue' && (userListUpdate['done'].includes(id))) {
            userListUpdate['done'].splice(userListUpdate['done'].indexOf(id), 1);
          }
          userListUpdate[typeButton].push(id);
        }
        await Users.updateOne({ userId: userId }, { [list]: userListUpdate })
      const user = await Users.findOne({ userId: userId }, 
        `animation ranobe manga animationRating mangaRating ranobeRating userName userId`);
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

// добавить/убрать аниме в избранное
// users/favorites/id/:id
router.put(
  '/favorites/id/:userId',
  async (req, res) => {
    const userId = req.params.userId || 1;
    const list = req.query.list;
    const id = Number(req.query.id) || 1;
    const rating = Number(req.query.rating) || 0;
    try {
        const userToUpdate = await Users.findOne({ userId: userId }, `${list}Rating`);
        const ratingUpdate = userToUpdate[`${list}Rating`];
        if (rating) {
          ratingUpdate[id] = rating;
        } else {
          delete ratingUpdate[id];
        }
        await Users.updateOne({ userId: userId }, { [`${list}Rating`]: ratingUpdate })

      const user = await Users.findOne({ userId: userId }, 
        'animation ranobe manga animationRating mangaRating ranobeRating userName userId');
      res.status(200).json({ user });
    } catch (e) {
      console.log(e)
    }
  }
)

// получить последние 10 просмотренных аниме
// users/id/lastViewed/:id
router.get(
  '/id/lastViewed/:userId',
  async (req, res) => {
    const userId = Number(req.params.userId) || 0;
    const listNames = ['animation', 'manga', 'ranobe'];
    let lastViewed = {};
    try {
      const user = await Users.findOne({ userId: userId }, 'lastViewed');
      if (user) {
        for (const i in listNames) {
          let lastViewedArr;
          if (listNames[i] === 'animation') {
            lastViewedArr = await Animation.find({ animationId: { $in: user.lastViewed[listNames[i]] } });
          } else if (listNames[i] === 'manga') {
            lastViewedArr = await Manga.find({ mangaId: { $in: user.lastViewed[listNames[i]] } });
          } else if (listNames[i] === 'ranobe') {
            lastViewedArr = await Ranobe.find({ ranobeId: { $in: user.lastViewed[listNames[i]] } });
          }
          lastViewed[listNames[i]] = user.lastViewed[listNames[i]].map(el => {
            const id = `${listNames[i]}Id`;
            return lastViewedArr.find(item => item[id] === el);
          }).reverse()
        }
      }
      res.status(200).json({ lastViewed });
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;