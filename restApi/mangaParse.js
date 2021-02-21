const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const config = require('config');
const Manga = require('./models/Manga');
const { spawn } = require('child_process');

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
const counter = 4300;
const arr = [];

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}
async function delayedLog(item) {
  await delay();
  const URL = `http://www.world-art.ru/animation/manga.php?id=${item}`;
  needle.get(URL, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    console.log(item, doc.toString().length);
    pathNameRu = ".//*[td/table/tr/td/b[contains(text(),'Год выпуска')]]//text()";
    pathType = ".//*[td/table/tr/td/b[contains(text(),'Жанр')]]//text()";
    pathNameRom = ".//*[td/b[contains(text(),'Названия (яп.)')]]/td[3]//text()";
    pathNameEng = ".//*[td/b[contains(text(),'Названия (англ.)')]]/td[3]//text()";
    pathAuthor = ".//*[td/b[contains(text(),'Авторы')]]/td[3]/a//text()";
    pathDate = ".//*[td/b[contains(text(),'Год выпуска')]]/td[3]//text()";
    pathGenre = ".//*[td/b[contains(text(),'Жанр')]]/td[3]/a//text()";
    pathCompany = ".//*[td/b[contains(text(),'Издательство')]]/td[3]//text()";
    pathImg = ".//*[div/@class='comment_block']//img/@src";
    const tmpNameRu = xpath.select(pathNameRu, doc);
    const tmpNameEng = xpath.select(pathNameEng, doc);
    const tmpNameRom = xpath.select(pathNameRom, doc);
    const tmpAuthor = xpath.select(pathAuthor, doc);
    let tmpDate = xpath.select(pathDate, doc);
    const tmpGenre = xpath.select(pathGenre, doc);
    const tmpType = xpath.select(pathType, doc);
    const tmpCompany = xpath.select(pathCompany, doc);
    const tmpImg = xpath.select(pathImg, doc);
    if (tmpImg.length) {
      const curl = spawn('curl', ['-o', `./imgManga/manga_cover_${item}.jpg`, `http://www.world-art.ru/animation/${tmpImg[0].value}`]);
      curl.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
    }
    if (!err && res.statusCode == 200 && tmpDate.length && tmpNameRu.length && Number(tmpDate) > 1960 &&
      !tmpGenre.map(el => el.data).includes('хентай') && doc.toString().length > 1000) {
      // const manga = new Manga({
      //   mangaId: item,
      //   nameRu: tmpNameRu.length ? tmpNameRu[0].data.split(' ').slice(0, -1).join(' ') : null,
      //   nameEng: tmpNameEng.length ? tmpNameEng[0].data : null,
      //   nameRom: tmpNameRom.length ? tmpNameRom[0].data : null,
      //   author: tmpAuthor.length ? tmpAuthor.map(el => el.data) : null,
      //   date: tmpDate.length ? tmpDate[0].data : null,
      //   genre: tmpGenre.length ? tmpGenre.map(el => el.data) : null,
      //   type: tmpType.length ? tmpType[0].data.split(' ').slice(-1).join(' ').slice(1, -1) : null,
      //   company: tmpCompany.length ? tmpCompany[0].data : null,
      // })
      // await manga.save()
    } else {
      if (!tmpNameRu.length) console.log('tmpNameRu.length')
      if (Number(tmpDate) <= 1960) console.log('date <= 1960');
      if (!tmpDate.length) console.log('!tmpDate.length')
      if (tmpGenre.map(el => el.data).includes('хентай')) console.log('хентай')
    }
  });
}
processArray(arr);
async function processArray(arr) {
  for (let i = 2; i <= counter; i++) {
    if (true) {
      arr.push(i);
    }
  }
  for (const item of arr) {
    await delayedLog(item);
  }
}