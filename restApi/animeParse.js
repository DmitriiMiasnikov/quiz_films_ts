const needle = require('needle');
const mongoose = require('mongoose');
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const fs = require('fs');
const config = require('config');
const Animation = require('./models/Animation');

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
let allAnimation;
const counter = 10750;
const arr = [];

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}
async function delayedLog(item) {
  await delay();
  // const obj = new Object();
  const URL = `http://www.world-art.ru/animation/animation.php?id=${item}`;
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
    pathNameRu = ".//*[table/tr/td/b[contains(text(),'Тип')]]/table[1]//text()";
    pathNameEng = ".//*[td/b[contains(text(),'Название (англ.)')]]/td[3]//text()";
    pathNameRom = ".//*[td/b[contains(text(),'Название (ромадзи)')]]/td[3]//text()";
    pathAuthor = ".//*[td/b[contains(text(),'Режиссёр')]]/td[3]/a//text()";
    pathDate = ".//*[td/b[contains(text(),'Премьера')]]/td[3]/a//text()";
    pathGenre = ".//*[td/b[contains(text(),'Жанр')]]/td[3]/a//text()";
    pathType = ".//*[td/b[contains(text(),'Тип')]]/td[3]//text()";
    pathBase = ".//*[td/b[contains(text(),'Основа')]]/td[3]//text()";
    pathAuditory = ".//*[td/b[contains(text(),'Целевая аудитория')]]/td[3]//text()";
    // pathSubscription = ".//*[table//font[contains(text(),'Краткое содержание')]]/table[6]//text()";
    const tmpNameRu = xpath.select(pathNameRu, doc);
    const tmpNameEng = xpath.select(pathNameEng, doc);
    const tmpNameRom = xpath.select(pathNameRom, doc);
    const tmpAuthor = xpath.select(pathAuthor, doc);
    let tmpDate = xpath.select(pathDate, doc);
    const tmpGenre = xpath.select(pathGenre, doc);
    const tmpType = xpath.select(pathType, doc);
    const tmpBase = xpath.select(pathBase, doc);
    const tmpAuditory = xpath.select(pathAuditory, doc);
    // const tmpSubscription = xpath.select(pathSubscription, doc);
    if (!tmpDate.length) {
      pathDate1 = ".//*[td/b[contains(text(),'Выпуск')]]/td[3]/a//text()";
      tmpDate = xpath.select(pathDate1, doc);
    }
    // tmpSubscription.length ? obj['description'] = tmpSubscription[0].data.replace(/<\/?[^>]+(>|$)/g, "") : null;
    let hasImage;
    try {
      if (fs.existsSync(`./../public/img/animation_cover_${item}.jpg`)) {
        hasImage = true
      } else hasImage = false
    } catch (err) {
      console.log(err);
    }
    const allAnimation = await Animation.find({}, 'animationId');
    if (!err && res.statusCode == 200 && tmpDate.length && tmpNameRu.length && Number(tmpDate.map(el => el.data)[2]) > 1960 &&
      !tmpGenre.map(el => el.data).includes('хентай') && !allAnimation.some(el => el.animationId === item) && 
      !tmpGenre.map(el => el.data).includes('эротика') && hasImage && doc.toString().length > 1000) {
      const animation = new Animation({
        animationId: item,
        nameRu: tmpNameRu.length ? tmpNameRu[0].data : null,
        nameEng: tmpNameEng.length ? tmpNameEng[0].data : null,
        nameRom: tmpNameRom.length ? tmpNameRom[0].data : null,
        author: tmpAuthor.length ? tmpAuthor[0].data : null,
        date: tmpDate.length ? tmpDate.map(el => el.data) : null,
        genre: tmpGenre.length ? tmpGenre.map(el => el.data) : null,
        type: tmpType.length ? tmpType[0].data : null,
        base: tmpBase.length ? tmpBase[0].data : null,
        auditory: tmpAuditory.length ? tmpAuditory[0].data : null,
      })
      await animation.save()
    } else {
      if (!tmpNameRu.length) console.log('tmpNameRu.length')
      if (Number(tmpDate.map(el => el.data)[2]) <= 1960) console.log('date <= 1960');
      if (allAnimation.some(el => el.animationId === item)) console.log('allAnimation.some(el => el.animationId === item)');
      if (!tmpDate.length) console.log('!tmpDate.length')
      if (tmpGenre.map(el => el.data).includes('хентай')) console.log('хентай')
      if (tmpGenre.map(el => el.data).includes('эротика')) console.log('эротика')
    }
  });
}
processArray(arr);
async function processArray(arr) {
  allAnimation = await Animation.find({}, 'animationId');
  for (let i = 5000; i <= counter; i++) {
    if (!allAnimation.some(el => el.animationId === i)) {
      arr.push(i);
    }
  }
  for (const item of arr) {
    await delayedLog(item);
  }
}