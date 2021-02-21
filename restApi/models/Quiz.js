const { Schema, model } = require('mongoose');

const schema = new Schema({
  quizId: {
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
  questions: {
    type: Schema.Types.Mixed,
    default: []
  },
})

module.exports = model('Ranobe', schema);