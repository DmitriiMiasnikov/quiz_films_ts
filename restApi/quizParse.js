const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const fs = require('fs');
const config = require('config');
const { spawn } = require('child_process');
const Film = require('./models/Film');

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
// all = 88
const counter = 0;
const arr = [];

let count = 0;

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

const setDataFilm = (URLfilm) => {
  const URL = `https://www.film.ru/${URLfilm}`;
  needle.get(URL, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    const pathName = "//head/*[@property='og:url']/@content";
    const pathTitle = "//div[@class='movies-center'][1]/h1[1]/text()[1]";
    const pathKeys = "//div[@class='movies-center'][1]/h3[1]/text()[1]";
    const pathSimilar = ".//*[@class='similar']/a/@href";
    const pathSimilarTitle = ".//*[@class='similar']/a/@title";
    const tmpName = xpath.select(pathName, doc);
    const tmpTitle = xpath.select(pathTitle, doc);
    const tmpKeys = xpath.select(pathKeys, doc);
    const tmpSimilar = xpath.select(pathSimilar, doc);
    const tmpSimilarTitle = xpath.select(pathSimilarTitle, doc);

    // console.log(tmpName[0].value.split('/').slice(-1).join(''));
    // console.log(tmpTitle[0].data);
    // console.log(tmpKeys[0].data.split(', '));
    // console.log(tmpSimilar.map(el => el.value.split('/').slice(-1).join('')));

    const pathImg = ".//*[@data-fancybox='frames']/@href";
    const tmpImg = xpath.select(pathImg, doc);
    let countImg = 0;
    for (let j = 0; j <= tmpImg.length && j < 3; j++) {
      const imageURL = `https://www.film.ru/${tmpImg[j].value}`;
        if (tmpImg[0].value) {
          const curl = spawn('curl', ['-o', `./imgSeries/${tmpName[0].value.split('/').slice(-1).join('')}_${countImg}.jpg`, imageURL]);
          curl.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });
          countImg = countImg + 1;
        } else {
          console.log('no img');
        }
    }
    await delay();
    console.log(count);
    // if (!err && res.statusCode == 200 && tmpTitle.length && tmpKeys.length &&
    //   tmpName.length && doc.toString().length > 1000) {
    //   const series = new Series({
    //     name: tmpName.length ? tmpName[0].value.split('/').slice(-1).join('') : null,
    //     title: tmpTitle.length ? tmpTitle[0].data : null,
    //     keys: tmpKeys.length ? tmpKeys[0].data.split(', ') : null,
    //     similar: tmpSimilar.length ? tmpSimilar.map((el, i) => {
    //       return {
    //         name: el.value.split('/').slice(-1).join(''),
    //         title: tmpSimilarTitle[i].value
    //       }
    //     }) : null
    //   })
    //   await series.save()
    // } else {
    //   if (!tmpName.length) console.log('tmpName.length')
    //   if (!tmpTitle.length) console.log('!title')
    //   if (!tmpKeys.length) console.log('!tmpKeys')
    // }
  })
}


async function delayedLog(item) {
  await delay();
  const pageURL = `https://www.film.ru/serials/a-z/rating/viewers/year1/0?page=${item}`;
  needle.get(pageURL, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    const pathFilm = '//*[@class="rating infinite_scroll"]/a/@href';
    const tmpItems = xpath.select(pathFilm, doc);
    for (let i = 0; i < tmpItems.length; i++) {
      // console.log(count, tmpItems[i].value);
      await delay();
      const filmURL = `https://www.film.ru/${tmpItems[i].value}`;
      needle.get(filmURL, async function (err, res) {
        const doc = new dom({
          locator: {},
          errorHandler: {
            warning: function (w) { },
            error: function (e) { },
            fatalError: function (e) { console.error(e) }
          }
        }).parseFromString(res.body);
        let pathFilm = ".//*[@class='submenu']//a[contains(text(), 'О сериале')]/@href";
        let tmpPathFilm = xpath.select(pathFilm, doc);
        if (!tmpPathFilm.length) {
          pathFilm = ".//*[@class='submenu']//a[contains(text(), 'Кадры')]/@href";
          tmpPathFilm = xpath.select(pathFilm, doc);
        }
        // console.log(i, tmpPathFilm[0].value);
        setDataFilm(tmpPathFilm[0].value);
      })
      await delay();
      count = count + 1;
    }
  });
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