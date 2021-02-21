const { Schema, model } = require('mongoose');

const schema = new Schema({
  ranobeId: {
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
  author: {
    type: Schema.Types.Mixed,
    default: ''
  },
  genre: {
    type: Schema.Types.Mixed,
    default: []
  },
  language: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
})

module.exports = model('Ranobe', schema);