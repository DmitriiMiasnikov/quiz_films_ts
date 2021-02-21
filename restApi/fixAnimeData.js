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
// последний id 10750
const counter = 10750;
const arr = [];

// function delay() {
//   return new Promise(resolve => setTimeout(resolve, 1000));
// }
async function delayedLog(item) {
  try {
    const animationToUpdate = await Animation.findOne({ animationId: item });
    let dateUpdate = animationToUpdate.date;
    let dateStart = '';
    let dateEnd = '';
    if (dateUpdate.length > 3) {
      dateStart = dateUpdate[2] + '-' + dateUpdate[1] + '-' + dateUpdate[0];
      dateEnd = dateUpdate[5] + '-' + dateUpdate[4] + '-' + dateUpdate[3];
    } else {
      dateStart = dateUpdate[2] + '-' + dateUpdate[1] + '-' + dateUpdate[0];
    }
    console.log(item, dateStart, dateEnd);
    // await Animation.updateOne({ animationId: item }, { $unset:{ date: 1 }})
    // await Animation.updateOne({ animationId: item }, { $set: { dateStart: dateStart, dateEnd: dateEnd ? dateEnd : null } })
  } catch (e) {
    console.log(e)
  }
}
processArray(arr);
async function processArray(arr) {
  allAnimation = await Animation.find({}, 'animationId');
  for (let i = 9121; i <= counter; i++) {
    if (allAnimation.some(el => el.animationId === i)) {
      arr.push(i);
    }
  }
  for (const item of arr) {
    await delayedLog(item);
  }
}