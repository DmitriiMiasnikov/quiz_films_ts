const { Router } = require("express");
const fs = require("fs");
const Statistics = require("../models/Statistics");
const StatisticsFilm = require("../models/StatisticsFilm");
const router = Router();

// количество прохождений и оценка теста
// quiz/:quizName
router.put("/quiz/:name", async (req, res) => {
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

// статистика конкретного фильма
// film/:name
router.post("/film/", async (req, res) => {
  try {
    const name = req.query.name;
    const answer = req.query.answer === req.query.name;
    const film = await StatisticsFilm.findOne({ name: name });
    const isRight = answer ? 'right' : 'wrong';
    if (film) {
      await StatisticsFilm.updateOne({ name: name }, { [`${isRight}Counter`]: film[`${isRight}Counter`] + 1 });
    } else {
      const statistics = new StatisticsFilm({
        name: name,
        rightCounter: answer ? 1 : 0,
        wrongCounter: !answer ? 1 : 0
      });
      statistics.save();
    }
    res.status(200).json({ answer });
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
