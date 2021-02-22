const { Router } = require('express');
const fs = require('fs');
const Quiz = require('../models/Quiz');
const router = Router();


// получение списка
// /list/
router.get(
  '/list',
  async (req, res) => {
    try {
      const quizList = await Quiz.find({}, 'name title')
      res.status(200).json({ quizList });
    } catch (e) {
      console.log(e)
    }
  }
)

module.exports = router;