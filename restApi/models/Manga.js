const { Schema, model } = require('mongoose');

const schema = new Schema({
  mangaId: {
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
    type: Schema.Types.Mixed,
    default: []
  },
  date: {
    type: Schema.Types.Mixed,
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
  company: {
    type: String,
    default: ''
  },
})

module.exports = model('Manga', schema);