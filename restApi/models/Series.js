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
  similar: {
    type:  Schema.Types.Mixed,
    default: []
  },
  keys: {
    type:  Schema.Types.Mixed,
    default: []
  },
})

module.exports = model('Series', schema);