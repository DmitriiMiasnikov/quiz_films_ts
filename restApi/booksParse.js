const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const fs = require('fs');
const config = require('config');
const { spawn } = require('child_process');
const Ranobe = require('./models/Ranobe');

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
const counter = 113;
const arr = [];
let count = 1;

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

async function delayedLog(item) {
  await delay();
  const URL = `https://jaomix.ru/?page=${item}`;
  needle.get(URL, async function (err, res) {
    const doc = new dom({
      locator: {},
      errorHandler: {
        warning: function (w) { },
        error: function (e) { },
        fatalError: function (e) { console.error(e) }
      }
    }).parseFromString(res.body);
    // console.log(item, doc.toString().length);
    const pathBook = '//*[@class="block-home"]/div';
    const tmpItems = xpath.select(pathBook, doc);
    for (let i = 0; i < tmpItems.length; i++) {
      const pathNameRu = ".//*[@class='header-home']/div[2]//a//text()";
      const pathNameEng = ".//*[@id='info']//*[span[contains(text(), 'Доп. название:')]]/span[2]//text()";
      const pathAuthor = ".//*[@id='info']//*[span[contains(text(), 'Автор:')]]/span[2]//text()";
      const pathGenre = ".//*[@id='info']//*[span[contains(text(), 'Жанры')]]/span[2]//text()";
      const pathLanguage = ".//*[@id='info']//*[span[contains(text(), 'Язык')]]/span[2]//text()";
      const pathDescription = ".//*[@class='slide-home']//text()";
      const pathImg = ".//*[@class='img-home']//img/@src";
      const tmpNameRu = xpath.select(pathNameRu, tmpItems[i]);
      const tmpNameEng = xpath.select(pathNameEng, tmpItems[i]);
      const tmpAuthor = xpath.select(pathAuthor, tmpItems[i]);
      const tmpGenre = xpath.select(pathGenre, tmpItems[i]);
      const tmpLanguage = xpath.select(pathLanguage, tmpItems[i]);
      const tmpDescription = xpath.select(pathDescription, tmpItems[i]);
      let tmpImg = xpath.select(pathImg, tmpItems[i]);
      // console.log(tmpNameRu[0].data, tmpNameEng[0].data, tmpAuthor[0].data, tmpGenre[0].data.split(', '),
      //   tmpLanguage[0].data, tmpDescription.map(el => el.data).join(''));
      const jpg = `${tmpImg[0].value.split('-').splice(-1).join('').split('.').splice(-1).join('')}`
      tmpImgNew = `${tmpImg[0].value.split('-').slice(0, -1).join('-')}.${jpg}`;
      // console.log(tmpImgNew);
      if (tmpImgNew) {
        const curl = spawn('curl', ['-o', `./imgBooks/${count}.jpg`, tmpImgNew]);
        curl.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
      }
      console.log(count);
      if (!err && res.statusCode == 200 && tmpImg && tmpNameRu.length && doc.toString().length > 1000) {
        const ranobe = new Ranobe({
          ranobeId: count,
          nameRu: tmpNameRu.length ? tmpNameRu[0].data : null,
          nameEng: tmpNameEng.length ? tmpNameEng[0].data : null,
          author: tmpAuthor.length ? tmpAuthor[0].data : null,
          genre: tmpGenre.length ? tmpGenre[0].data.split(', ') : null,
          language: tmpLanguage.length ? tmpLanguage[0].data : null,
          description: tmpDescription.length ? tmpDescription.map(el => el.data).join('') : null,
        })
        await ranobe.save()
      } else {
        if (!tmpNameRu.length) console.log('tmpNameRu.length')
        if (!tmpImg) console.log('!tmpImg')
      }
      count = count + 1;
    }
    await delay();
  });
}
processArray(arr);
async function processArray(arr) {
  for (let i = 1; i <= counter; i++) {
    if (true) {
      arr.push(i);
    }
  }
  for (const item of arr) {
    await delayedLog(item);
  }
}