const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: {
    type: Schema.Types.Mixed,
    required: true
  },
})

module.exports = model('Quiz', schema);