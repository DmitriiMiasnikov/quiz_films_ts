const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  completed: {
    type:  Number,
    default: 0
  },
  scores: {
    type:  Schema.Types.Mixed,
    default: []
  },
})

module.exports = model('Statistics', schema);