const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  rights: {
    type: Schema.Types.Mixed,
    default: ['user']
  },
})

module.exports = model('Users', schema);