const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const fs = require('fs');
const config = require('config');
const Film = require('./models/Film');
const Quiz = require('./models/Quiz');

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
const counter = 0;
const arr = [];

// function delay() {
//   return new Promise(resolve => setTimeout(resolve, 1000));
// }
async function delayedLog(item) {
  try {
    const shuffleFunc = (arr) => arr.map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0]).map((a) => a[1]);

    let arrFilmsByKey = await Film.find({ keys: 'анимация' });
    let arrAllFilms = await Film.find({})
    arrFilmsByKey = shuffleFunc(arrFilmsByKey);
    let questions = [];

    for (let j = 0; j < 18; j++) {
      const arrFilmsByKeySliced = arrFilmsByKey.slice(j * 10, j * 10 + 10)
      arrFilmsByKeySliced.forEach((el, i) => {
        let options;
        if (el.similarFilms && el.similarFilms.length >= 4) {
          options = shuffleFunc(el.similarFilms).slice(0, 4)
        } else if (el.similarFilms && el.similarFilms.length < 4) {
          const length = el.similarFilms.length;
          options = shuffleFunc(el.similarFilms).concat(
            shuffleFunc(arrFilmsByKey.filter(el => arrFilmsByKeySliced
              .every(item => item.name !== el.name)).map(el => el.name)).slice(0, 4 - length)
          )
        } else if (!el.similarFilms) {
          options = shuffleFunc(arrFilmsByKey.filter(el => arrFilmsByKeySliced
            .every(item => item.name !== el.name)).map(el => el.name)).slice(0, 4);
        }
        options = options.map((item, j) => {
            console.log(options);
            const selectedFilm = arrAllFilms.find(film => film.name === item);
            console.log(selectedFilm, item);
            return {
              name: item,
              title: selectedFilm.title
            }
          })
        const question = {
          options: options.concat({ name: el.name, title: el.title }),
          currect: { name: el.name, title: el.title }
        }
        questions.push(question);
      })
      console.log(questions);
      // const quiz = new Quiz({
      //   name: `animation_${item}`,
      //   title: `Анимационные фильмы - ${item}`,
      //   questions: questions
      // })
      // await quiz.save()
    }
  } catch (e) {
    console.log(e)
  }
}
processArray(arr);
async function processArray(arr) {
  for (let i = 0; i <= counter; i++) {
    if (true) {
      arr.push(i);
    }
  }
  for (const item of arr) {
    await delayedLog(item);
  }
}