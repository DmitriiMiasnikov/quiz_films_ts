const { Schema, model } = require('mongoose');

const schema = new Schema({
  filmId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  similarFilms: {
    type:  Schema.Types.Mixed,
    default: []
  },
  keys: {
    type:  Schema.Types.Mixed,
    default: []
  },
})

module.exports = model('Ranobe', schema);