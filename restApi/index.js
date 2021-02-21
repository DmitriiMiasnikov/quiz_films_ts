const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const usersRoutes = require('./routes/usersRoutes');
const listRoutes = require('./routes/listRoutes');
const cors = require('cors');
// const session = require('express-session');
// const cookieParser = require('cookie-parser')
// const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(express.json({ extended: true }))
app.use(cors());
app.options('*', cors());
app.use('/users', usersRoutes);
app.use('/list', listRoutes);
// app.use(cookieParser());

// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({ url: config.get('mongoUri') }),
//   cookie: { maxAge: 60000 }
// }))
// app.get('/', function (req, res) {
//   console.log('session: ', req.session)
//   console.log('sessionID: ', req.sessionID)
// })
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