const { Schema, model } = require('mongoose');

const schema = new Schema({
  animationId: {
    type: Number,
    required: true
  },
  nameRu: {
    type: String,
    default: ''
  },
  nameEng: {
    type: String,
    default: ''
  },
  nameRom: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  date: {
    type: Schema.Types.Mixed,
    default: []
  },
  dateStart: {
    type: String,
    default: ''
  },
  dateEnd: {
    type: String,
    default: ''
  },
  genre: {
    type: Schema.Types.Mixed,
    default: []
  },
  type: {
    type: String,
    default: ''
  },
  auditory: {
    type: String,
    default: ''
  },
  base: {
    type: String,
    default: ''
  },
})

module.exports = model('Animation', schema);