const { Router } = require("express");
const fs = require("fs");
const FilmByQuiz = require("../models/FilmByQuiz");
const router = Router();

// получение списка
// quiz/list/
router.get("/list/:page", async (req, res) => {
  try {
    const page = Number(req.params.page);
    const catalog = req.query.catalog;
    let list;
    let quizAll;
    if (catalog === "films") {
      quizAll = [
        { name: "action", title: "Боевики" },
        { name: "advanture", title: "Приключения" },
        { name: "animation", title: "Анимация" },
        { name: "biography", title: "Биографические" },
        { name: "comedy", title: "Комедии" },
        { name: "crime", title: "Преступления" },
        { name: "drama", title: "Драмы" },
        { name: "family", title: "Семейные" },
        { name: "fantasy", title: "Фентези" },
        { name: "history", title: "Исторические" },
        { name: "horror", title: "Ужасы" },
        { name: "music", title: "Музыкальные" },
        { name: "musical", title: "Мюзиклы" },
        { name: "mystery", title: "Мистика" },
        { name: "romance", title: "Романтика" },
        { name: "sci_fi", title: "Фантастика" },
        { name: "sport", title: "Спорт" },
        { name: "thriller", title: "Триллеры" },
        { name: "war", title: "Военные" },
        { name: "western", title: "Вестерны" },
        { name: "top250", title: "Топ 250" },
      ];
      allFilms = await FilmByQuiz.find({});
    } else if (catalog === "serials") {
      quizAll = [{ name: "action", title: "Боевики" }];
      allFilms = await FilmByQuiz.find({});
    }
    list = quizAll
      .map((el) => {
        filmsByGenre = allFilms.filter((item) => item.quiz.includes(el.name));
        randomName =
          filmsByGenre[Math.floor(Math.random() * filmsByGenre.length)].images[0];
        return {
          name: el.name,
          title: el.title,
          randomName: randomName,
        };
      })
      .slice(page * 12 - 12, page * 12);
    res.status(200).json({ list, countAll: quizAll.length });
  } catch (e) {
    console.log(e);
  }
});

// получение теста
// quiz/:quizName
router.get("/:quizName", async (req, res) => {
  try {
    const quizName = req.params.quizName;
    const filmsByQuiz = await FilmByQuiz.find({ quiz: quizName });
    const shuffleFunc = (arr) =>
      arr
        .map((a) => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map((a) => a[1]);
    let tenFilms = shuffleFunc(filmsByQuiz).slice(0, 10);
    const questions = tenFilms.map((el) => {
      return {
        currect: el.title,
        image: el.images[Math.floor(Math.random() * el.images.length)],
        options: shuffleFunc(el.similarFilms).slice(0, 4).concat(el.title),
      };
    });
    const quiz = {
      name: quizName,
      questions: questions,
    };
    res.status(200).json({ quiz });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
