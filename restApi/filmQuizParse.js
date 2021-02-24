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
// all = 0
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
        img.src = imageURL;
        // const curl = spawn('curl', ['-o', `./imgFilms/${tmpName[0].value.split('/').slice(-1).join('')}_${countImg}.jpg`, imageURL]);
        // curl.stdout.on('data', (data) => {
        //   console.log(`stdout: ${data}`);
        // });
        countImg = countImg + 1;
      } else {
        console.log('no img');
      }
    }
    await delay();
    console.log(count);
    if (!err && res.statusCode == 200 && tmpTitle.length && tmpKeys.length &&
      tmpName.length && doc.toString().length > 1000) {
      // const film = new Film({
      //   name: tmpName.length ? tmpName[0].value.split('/').slice(-1).join('') : null,
      //   title: tmpTitle.length ? tmpTitle[0].data : null,
      //   keys: tmpKeys.length ? tmpKeys[0].data.split(', ') : null,
      //   similarFilms: tmpSimilar.length ? tmpSimilar.map((el, i) => {
      //     return {
      //       name: el.value.split('/').slice(-1).join(''),
      //       title: tmpSimilarTitle[i].value
      //     }
      //   }) : null
      // })
      // await film.save()
    } else {
      if (!tmpName.length) console.log('tmpName.length')
      if (!tmpTitle.length) console.log('!title')
      if (!tmpKeys.length) console.log('!tmpKeys')
    }
  })
}


async function delayedLog(item) {
  await delay();
  // адрес списка
  const pageURL = `https://www.imdb.com/chart/top/?ref_=nv_mv_250`;
  needle.get(pageURL, async function (err, res) {
    const doc1 = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    console.log('длина дока ', doc1.length);
    // ссылка на фильм в списке
    const pathFilm = '//*[@class="lister-list"]//*[@class="titleColumn"]/a/@href';
    const tmpItems = xpath.select(pathFilm, doc1);
    for (let i = 0; i < tmpItems.length; i++) {
      console.log('ссылка на фильм в списке ', count, tmpItems.length, tmpItems[i].value);
      await delay();
      const filmURL = `https://www.imdb.com/${tmpItems[i].value}`;
      needle.get(filmURL, async function (err, res) {
        const doc2 = new dom({
          locator: {},
          errorHandler: {
            warning: function (w) { },
            error: function (e) { },
            fatalError: function (e) { console.error(e) }
          }
        }).parseFromString(res.body);
        //ссылка на фотки
        let pathPhotos = ".//*[@id='titleImageStrip']//*[@class='combined-see-more see-more']/a/@href";
        let tmpPhotos = xpath.select(pathPhotos, doc2);
          console.log('ссылка на фотки ', count, tmpPhotos[0].value);
          const allImgURL = `https://www.imdb.com/${tmpPhotos[0].value}`;
          needle.get(allImgURL, async function (err, res) {
            const doc3 = new dom({
              locator: {},
              errorHandler: {
                warning: function (w) { },
                error: function (e) { },
                fatalError: function (e) { console.error(e) }
              }
            }).parseFromString(res.body);
            // ссылка только на кадры из фильма
            let pathPhotos = ".//*[@id='media_index_type_filters']//*[a[contains(text(),'Still Frame')]]/@href";
            let tmpPhotos = xpath.select(pathPhotos, doc3);
            console.log('ссылка только на кадры ', count, tmpPhotos[0].value);
            const imgagesURL = `https://www.imdb.com/${tmpPhotos[0].value}`;
            needle.get(imgagesURL, async function (err, res) {
              const doc4 = new dom({
                locator: {},
                errorHandler: {
                  warning: function (w) { },
                  error: function (e) { },
                  fatalError: function (e) { console.error(e) }
                }
              }).parseFromString(res.body);
              // массив ссылок на конкретное фото
              let pathPhoto = ".//*[@id='media_index_thumbnail_grid']/a/@href";
              let tmpPhoto = xpath.select(pathPhoto, doc4);
              for(let key = 0; key < tmpPhoto.length; key++) {
                console.log('массив ссылок на конкретное фото ', count, tmpPhoto[key].value);
                const filmURL = `https://www.imdb.com/${tmpPhoto[key].value}`;
                needle.get(filmURL, async function (err, res) {
                  const doc5 = new dom({
                    locator: {},
                    errorHandler: {
                      warning: function (w) { },
                      error: function (e) { },
                      fatalError: function (e) { console.error(e) }
                    }
                  }).parseFromString(res.body);
                  //скачиваем фото
                  let pathPhotoLink = ".//*[@data-testid='media-viewer']//*[contains(@class, 'MediaViewerImagestyles__LandscapeImage-sc')]/@src";
                  let tmpPhotoLink = xpath.select(pathPhotoLink, doc5);
                  console.log('скачиваем фото ', count, tmpPhotoLink[1].value);
                  if (tmpPhotoLink[1].value) {
                    const curl = spawn('curl', ['-o', `./imgFilms/1.jpg`, tmpPhotoLink[1].value]);
                    curl.stdout.on('data', (data) => {
                      console.log(`stdout: ${data}`);
                    });
                    countImg = countImg + 1;
                  } else {
                    console.log('no img');
                  }
                })
              }
            }) 
          }) 
        // console.log(i, tmpPathFilm[0].value);
        // setDataFilm(tmpPathFilm[0].value);
      })
      count = count + 1;
    }
  });
}
processArray(arr);
async function processArray(arr) {
  for (let i = count; i <= counter; i++) {
    if (true) {
      arr.push(i);
    }
  }
  for (const item of arr) {
    await delayedLog(item);
  }
}