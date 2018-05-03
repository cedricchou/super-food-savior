const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const knex = require("./db/index");
const bcrypt = require('bcrypt');

// authentication package
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;

const KnexSessionStore = require('connect-session-knex')(session);

// Routes
const index = require('./routes/index');
const users = require('./routes/users');
const donations = require('./routes/donations');
const login = require('./routes/login');
const logout = require('./routes/logout');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session

const store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions"
});

app.use(session({
  secret: 'whatever4#%*$?/da',
  resave: false,
  store: store,
  saveUninitialized: false
  // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/donations', donations);
app.use('/login', login);
app.use('/logout', logout);

// passport local strategy

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(username, password, done) {
    knex
    .select('*')
    .from('users')
    .where({ email: username })
    .first()
    .then((user) => {
      console.log(user);
      if(!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }).catch((error) => {return done(error)})
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
