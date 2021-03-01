const { Router } = require("express");
const fs = require("fs");
const FilmByQuiz = require("../models/FilmByQuiz");
const Statistics = require("../models/Statistics");
const router = Router();

// количество прохождений и оценка
// quiz/:quizName
router.put("/:name", async (req, res) => {
  try {
    const quizName = req.params.name;
    const score = Number(req.query.score);
    const quiz = await Statistics.findOne({ name: quizName });
    if (quiz) {
      await Statistics.updateOne(
        { name: quizName },
        { scores: quiz.scores.concat(score) }
      );
    } else {
      const statistics = new Statistics({
        name: quizName,
        scores: [score],
      });
      statistics.save();
    }
    res.status(200).json({ quiz });
  } catch (e) {
    console.log(e);
  }
});

// получить инфу по тесту
router.get("/:name", async (req, res) => {
  try {
    const quizName = req.params.name;
    let statisticsQuiz = await Statistics.findOne({ name: quizName });
    res.status(200).json({ statisticsQuiz, quizName });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
