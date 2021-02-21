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
const counter = 33;
const arr = [];
let count = 0;

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

async function delayedLog(item) {
  const pageURL = `https://www.film.ru/movies/a-z/genre/0?page=${item}`;
  needle.get(pageURL, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    console.log(item, doc.toString().length);
    const pathFilm = '//*[@class="rating infinite_scroll"]/a/@href';
    const tmpItems = xpath.select(pathFilm, doc);
    for (let i = 0; i < tmpItems.length; i++) {
      const filmURL = `https://www.film.ru/${tmpItems[i]}`;
      needle.get(filmURL, async function (err, res) {
        const doc = new dom({
          locator: {},
          errorHandler: {
            warning: function (w) { },
            error: function (e) { },
            fatalError: function (e) { console.error(e) }
          }
        }).parseFromString(res.body);
        const pathFilm = ".//*[@class='submenu']//a[contains(text(), 'Кадры')]/@href";
        const URL = `https://www.film.ru/${pathFilm[0]}`;
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
          const tmpName = xpath.select(pathName, doc);
          const tmpTitle = xpath.select(pathTitle, doc);
          const tmpKeys = xpath.select(pathKeys, doc);
          const tmpSimilar = xpath.select(pathSimilar, doc);
          console.log(tmpName[0].data.split('/').slice(-1).join(''), tmpTitle[0].data,
            tmpKeys[0].data.split(', '), tmpSimilar.map(el => el.split('/').slice(-1).join(''))
          );
          
          for (let i = 1; i <= 10; i++) {
            const imageURL = `${URL}#frames-${i}`;
            needle.get(imageURL, async function (err, res) {
              const doc = new dom({
                locator: {},
                errorHandler: {
                  warning: function (w) { },
                  error: function (e) { },
                  fatalError: function (e) { console.error(e) }
                }
              }).parseFromString(res.body);
  
              const pathImg = ".//*[@class='fancybox-stage']//div[contains(@class, 'fancybox-slide--current')]/img/@src";
              const tmpImg = xpath.select(pathImg, doc);
              console.log(tmpImg[0].value);
              // if (tmpImg[0].value) {
              //   const curl = spawn('curl', ['-o', `./imgBooks/${count}.jpg`, tmpImgNew]);
              //   curl.stdout.on('data', (data) => {
              //     console.log(`stdout: ${data}`);
              //   });
              // }
            })
          }
          // if (!err && res.statusCode == 200 && tmpImg && tmpNameRu.length && doc.toString().length > 1000) {
          //   const film = new Film({
          //     filmId: count,
          //     nameRu: tmpNameRu.length ? tmpNameRu[0].data : null,
          //     nameEng: tmpNameEng.length ? tmpNameEng[0].data : null,
          //     author: tmpAuthor.length ? tmpAuthor[0].data : null,
          //     genre: tmpGenre.length ? tmpGenre[0].data.split(', ') : null,
          //     language: tmpLanguage.length ? tmpLanguage[0].data : null,
          //     description: tmpDescription.length ? tmpDescription.map(el => el.data).join('') : null,
          //   })
          //   await film.save()
          // } else {
          //   if (!tmpNameRu.length) console.log('tmpNameRu.length')
          //   if (!tmpImg) console.log('!tmpImg')
          // }
        })
      })
      count = count + 1;
    }
    await delay();
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