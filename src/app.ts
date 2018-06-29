import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'express-flash';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import connect_redis from 'connect-redis';

import hash from './modules/hash';

//routes
import index from './routes/index';
import users from './routes/users';
import login from './routes/login';
import logout from './routes/logout';
import signup from './routes/signup';

//models
import IUserDocument from './interfaces/IUserDocument';

const User = mongoose.model("User");

mongoose.connect('mongodb://localhost/test-passport')
const db = mongoose.connection;

const RedisStore = connect_redis(session);

db.on('error', (err) => {
  console.error(err);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'passport',
  store: new RedisStore({}),
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    secure: false
  },
}));

//passport
const localStrategy = LocalStrategy.Strategy;

passport.use(new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, userId, password, done) => {
  process.nextTick(() => {
    User.findOne({
      "userId": userId
    }, (err, user: IUserDocument) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false);
      }
      const hashed = hash(password, 'secret');
      if (user.password != hashed &&
        user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
}));

passport.serializeUser((user: IUserDocument, done) => {
  done(null, { userId: user.userId, email: user.email });
});

passport.deserializeUser((serializeUser, done) => {
  User.findOne({ userId: serializeUser }, (err, user: IUserDocument) => {
    done(err, { userId: user.userId, email: user.email });
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err: global.Error = createError(404)
  next(err);
});

// error handler
app.use(function (err: any, req: express.Request, res: express.Response, next: Function) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
