const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const fs = require('fs');
const config = require('config');
const { spawn } = require('child_process');
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
// all = 0
const counter = 0;
const arr = [];
let count = 0;

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

async function delayedLog(item) {
  // адрес списка
  const pageURL = `https://www.imdb.com/chart/top/?ref_=nv_mv_250`;
  needle.get(pageURL, async function (err, res) {
    try {
      const doc1 = new dom({
        locator: {},
        errorHandler: {
          warning: function (w) { },
          error: function (e) { },
          fatalError: function (e) { console.error(e) }
        }
      }).parseFromString(res.body);
      // ссылка на фильм в списке
      const pathFilm = '//*[@class="lister-list"]//*[@class="titleColumn"]/a/@href';
      const tmpItems = xpath.select(pathFilm, doc1);
      for (let i = 0; i < 1; i++) {
        // console.log('ссылка на фильм в списке ', count, tmpItems.length, `https://www.imdb.com/${tmpItems[i].value}`);
        console.log(count);
        await filmInfo(tmpItems[i].value);
      }
    } catch (e) {
      console.log(e)
    }
  });
}

async function filmInfo(link) {
  const filmURL = `https://www.imdb.com/${link}`;
  needle.get(filmURL, async function (err, res) {
    const doc2 = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    const pathTitle = ".//*[@id='star-rating-widget']/@data-title";
    const tmpTitle = xpath.select(pathTitle, doc2);
    const pathName = ".//*[@class='title_wrapper']/div[@class='originalTitle'][1]/text()[1]";
    const tmpName = xpath.select(pathName, doc2);

    const pathSimilar = ".//*[@class='rec_view']//div[@class='rec_item']//img/@title";
    const tmpSimilar = xpath.select(pathSimilar, doc2);

    const name = tmpName[0].data.toLowerCase().split(' ').join('_')
    // console.log('название ', tmpTitle[0].value, name, tmpSimilar.map(el => el.value));

    //ссылка на фотки
    let pathPhotos = ".//*[@id='titleImageStrip']//*[@class='combined-see-more see-more']/a/@href";
    let tmpPhotos = xpath.select(pathPhotos, doc2);
    // console.log('ссылка на фотки ', count, `https://www.imdb.com/${tmpPhotos[0].value}`);
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
      let pathPhotos = ".//*[@id='media_index_type_filters']/ul/li[1]/a/@href";
      let tmpPhotos = xpath.select(pathPhotos, doc3);
      // console.log('ссылка только на кадры ', count, `https://www.imdb.com/${tmpPhotos[0].value}`);
      const imagesURL = `https://www.imdb.com/${tmpPhotos[0].value}`;
      needle.get(imagesURL, async function (err, res) {
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
        const numbers = [0, 1, 2, 3, 4];
        let arrPic = [];
        numbers.forEach(() => {
          if (tmpPhoto.length < 5) {
            arrPic = numbers.slice(0, tmpPhoto.length);
          } else {
            let rand = Math.floor(Math.random() * tmpPhoto.length);
            while (arrPic.includes(rand)) {
              rand = Math.floor(Math.random() * tmpPhoto.length)
            }
            arrPic.push(rand)
          }
        })
        // console.log(tmpPhoto.length, arrPic);
        let tmpImages = [];
        for (const key of arrPic) {
          // arrPic.forEach((key) => {
          // console.log('массив ссылок на конкретное фото ', count, `https://www.imdb.com/${tmpPhoto[key].value}`);
          const filmURL2 = `https://www.imdb.com/${tmpPhoto[key].value}`;
          needle.get(filmURL2, async function (err, res) {
            const doc5 = new dom({
              locator: {},
              errorHandler: {
                warning: function (w) { },
                error: function (e) { },
                fatalError: function (e) { console.error(e) }
              }
            }).parseFromString(res.body);
            const pathPhotoInfo = ".//*[@data-testid='media-viewer']//*[contains(@class, 'MediaViewerImagestyles__LandscapeContainer-sc')]/@style";
            const tmpPhotoInfo = xpath.select(pathPhotoInfo, doc5);
            let size = {};
            tmpPhotoInfo[0].value.split(';').slice(0, 2).forEach(el => {
              size[`${el.split(':')[0].split('-')[1]}`] = parseInt(el.split(':')[1], 10)
            })
            // console.log(size);
            if (size.width < size.height * 1.2) {
              let rand = Math.floor(Math.random() * tmpPhoto.length);
              while (arrPic.includes(rand)) {
                rand = Math.floor(Math.random() * tmpPhoto.length)
              }
              arrPic.push(rand)
              return;
            }
            //скачиваем фото
            let pathPhotoLink = ".//*[@data-testid='media-viewer']//*[contains(@class, 'MediaViewerImagestyles__LandscapeImage-sc')]/@src";
            let tmpPhotoLink = xpath.select(pathPhotoLink, doc5);
            // console.log('скачиваем фото ', count, tmpPhotoLink[1].value);
            if (tmpPhotoLink[1].value) {
              tmpImages.push(`${name}_${key}`);
              const curl = spawn('curl', ['-o', `./imgFilms/${name}_${key}.jpg`, tmpPhotoLink[1].value]);
              curl.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
              });
            } else {
              console.log('no img');
            }
          })
        }
        await new Promise((res) => setTimeout(res, 2000));
        if (!err && res.statusCode == 200 && tmpTitle.length &&
          tmpName.length) {
          // console.log({
          //   name: tmpName.length ? name : null,
          //   title: tmpTitle.length ? tmpTitle[0].value : null,
          //   quiz: ['top250'],
          //   similarFilms: tmpSimilar.length ? tmpSimilar.map(el => el.value) : null,
          //   images: tmpImages,
          // })
          console.log(done);
          const film = new FilmByQuiz({
            name: tmpName.length ? name : null,
            title: tmpTitle.length ? tmpTitle[0].value : null,
            quiz: ['top250'],
            similarFilms: tmpSimilar.length ? tmpSimilar.map(el => el.value) : null,
            images: tmpImages,
          })
          await film.save()
        } else {
          if (!tmpName.length) console.log('tmpName.length')
          if (!tmpTitle.length) console.log('!title')
        }
      })
    })
  })
  count = count + 1;
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