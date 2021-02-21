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
  animation: {
    type: Schema.Types.Mixed,
    default: {
      done: [],
      queue: []
    }
  },
  ranobe: {
    type: Schema.Types.Mixed,
    default: {
      done: [],
      queue: []
    }
  },
  manga: {
    type: Schema.Types.Mixed,
    default: {
      done: [],
      queue: []
    }
  },
  animationRating: {
    type: Schema.Types.Mixed,
    default: {
      0: 0
    }
  },
  mangaRating: {
    type: Schema.Types.Mixed,
    default: {
      0: 0
    }
  },
  ranobeRating: {
    type: Schema.Types.Mixed,
    default: {
      0: 0
    }
  },
  lastViewed: {
    type: Schema.Types.Mixed,
    default: {
      animation: [],
      ranobe: [],
      manga: []
    }
  }
})

module.exports = model('Users', schema);