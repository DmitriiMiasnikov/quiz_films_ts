const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const quizRoutes = require('./routes/quizRoutes');
const usersRoutes = require('./routes/usersRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: true }))
app.use(cors());
app.options('*', cors());
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