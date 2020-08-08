var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var cors = require('cors')
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

require('dotenv').config();
var mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@brainsparkcluster.sjfbl.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var depressionRouter = require('./routes/depression');
var selfHarmRouter = require('./routes/selfharm');
var lonelinessRouter = require('./routes/loneliness');
var anxietyRouter = require('./routes/anxiety');
var aboutRouter = require('./routes/about');
var beckRouter = require('./routes/beck');
var beckResultsRouter = require('./routes/beckresults');

var auth = require('./routes/auth')
var User = require('./models/user.js')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
  'store': new session.MemoryStore(),
  'secret': 'gfr456$^(%$jfkderfg',
  'resave': false,
  'saveUninitialized': false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/depression', depressionRouter);
app.use('/selfharm', selfHarmRouter);
app.use('/loneliness', lonelinessRouter);
app.use('/anxiety', anxietyRouter);
app.use('/about', aboutRouter);
app.use('/beck', beckRouter);
app.use('/beckresults', beckResultsRouter);

app.use('/auth', auth);

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(user, callback) {
  callback(null, user);
});

passport.use(new localStrategy(function(username, password, done) {
  User.findOne({username:username})
  .exec()
  .then(result => {
      if (result) {
          if (result.comparePassword(password, result.password)) {
            done(null, result);
          } else {
            done(null, false);
          }
      } else {
        var newUser = new User()
        newUser.username = username;
        newUser.password = newUser.hashPassword(password);
        newUser.save()
            .then(result => {
              done(null, result);
            })
            .catch(err => console.log(err));
      }
  })
  .catch(err => console.log(err))
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
