const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const quizRoutes = require('./routes/quizRoutes');
const usersRoutes = require('./routes/usersRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const cors = require('cors');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(express.json({ extended: true }))
app.use(cors());
app.options('*', cors());
app.use(cookieParser());
app.set('trust proxy', 1)
app.use(session({
  secret: 'secret',
  name: 'sessionation',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: config.get('mongoUri')
  }),
  cookie: { maxAge: null, secure: true, httpOnly: true, path: '/users/' }
}))
app.use('/users', usersRoutes);
app.use('/quiz', quizRoutes);
app.use('/statistics', statisticsRoutes);

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    app.listen(config.get('port'), () => {
      console.log('server started...')
    })
  } catch (e) {
    console.log(e);
  }
}
start();