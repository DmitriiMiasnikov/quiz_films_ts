const { Router } = require('express');
const fs = require('fs');
const Quiz = require('../models/Quiz');
const router = Router();


// получение списка
// quiz/list/
router.get(
  '/list',
  async (req, res) => {
    try {
      const quizList = await Quiz.find({}, 'name title questions');
      const list = quizList.map(el => {
        return {
          name: el.name,
          title: el.title,
          randomName: el.questions[Math.floor(Math.random() * el.questions.length)].currect.name
        };
      })
      res.status(200).json({ list });
    } catch (e) {
      console.log(e)
    }
  }
)

// получение списка
// quiz/:quizName
router.get(
  '/:quizName',
  async (req, res) => {
    try {
      const quizName = req.params.quizName;
      const quiz = await Quiz.findOne({ name: quizName }, 'name title questions');
      res.status(200).json({ quiz });
    } catch (e) {
      console.log(e)
    }
  }
)


module.exports = router;