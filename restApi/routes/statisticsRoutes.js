const { Router } = require("express");
const fs = require("fs");
const FilmByQuiz = require("../models/FilmByQuiz");
const Statistics = require("../models/Statistics");
const router = Router();

// количесво прохождений и оценка
// quiz/:quizName
router.put("/:name", async (req, res) => {
  try {
    const quizName = req.params.name;
    const score = Number(req.query.score);
    const quiz = await Statistics.findOne({ name: quizName });
    if (quiz) {
      await Statistics.updateOne(
        { name: quizName },
        { completed: quiz.completed + 1, scores: quiz.scores.concat(score) }
      );
    } else {
      const statistics = new Statistics({
        name: quizName,
        completed: 1,
        scores: [score],
      });
      statistics.save();
    }
    res.status(200).json({ quiz });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
