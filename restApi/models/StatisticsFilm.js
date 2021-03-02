const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  rightCounter: {
    type:  Number,
    default: 0
  },
  wrongCounter: {
    type:  Number,
    default: 0
  },
})

module.exports = model('StatisticsFilm', schema);