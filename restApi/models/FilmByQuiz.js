const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  similarFilms: {
    type:  Schema.Types.Mixed,
    default: []
  },
  quiz: {
    type:  Schema.Types.Mixed,
    default: []
  },
  images: {
    type:  Schema.Types.Mixed,
    default: []
  },
})

module.exports = model('FilmByQuiz', schema);