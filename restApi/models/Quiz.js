const { Schema, model } = require('mongoose');

const schema = new Schema({
  catalog: {
    type: String,
    required: true
  },
  list: {
    type:  Schema.Types.Mixed,
    default: []
  },
})

module.exports = model('Quiz', schema);