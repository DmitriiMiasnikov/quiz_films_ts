const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const fs = require('fs');
const config = require('config');
const FilmByQuiz = require('./models/FilmByQuiz');

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
  } catch (e) {
    console.log(e);
  }
}
start();
let films;

const counter = 339;
const arr = [];

async function delayedLog(item) {
  try {
    const filmInCatalog = await FilmByQuiz.findOne({ name: item });
    if (filmInCatalog.quiz.some(el => el !== 'action')) {
      // console.log(filmInCatalog.quiz)
      filmInCatalog.quiz.splice(filmInCatalog.quiz.indexOf('action'), 1);
      await FilmByQuiz.updateOne({ name: item }, { quiz: filmInCatalog.quiz });
      // console.log(filmInCatalog.quiz);
      // filmInCatalog.quiz = filmInCatalog.quiz.splice(filmInCatalog.quiz.indexOf('action'), 1)
    } else if (filmInCatalog.quiz.length === 1 && filmInCatalog[0] === 'action') {
      console.log('delete');
      await FilmByQuiz.deleteOne({ name: item });
    }
  } catch (e) {
    console.log(e)
  }
}
processArray(arr);
async function processArray(arr) {
  films = await FilmByQuiz.find({ quiz: 'action' });
  films.forEach(el => {
    arr.push(el.name)
  })
  for (const item of arr) {
    await delayedLog(item);
  }
}