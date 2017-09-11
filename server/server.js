const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const db = require('./db/index');

const port = 8000;

app.use(cookieParser());
app.use(session({
  secret: '$ecret Chat Room',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./passport/init')(passport);

app.use(express.static(path.join(__dirname, '../dist')));

const user = require('./routes/user')(passport);
const room = require('./routes/room');
const message = require('./routes/message');

app.use('/api/user', user);
app.use('/api/room', room);
app.use('/api/message', message);

app.listen(port, () => {
  console.log('Server is listening on ', port);
  db.sequelize.sync()
  .then(() => {
    console.log('Tables has been created');
  });
});

