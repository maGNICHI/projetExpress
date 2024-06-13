var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var configA=require('./mongodb.json');
var mongoose=require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contacts = require('./routes/contacts');
var Joueur = require('./routes/joueur');
var Partie = require('./routes/partie');
var Niveau = require('./routes/niveau');
var Batiment = require('./routes/batiment');
var app = express();
mongoose.connect(configA.mongo.uri);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts',contacts);
app.use('/joueur',Joueur);
app.use('/partie',Partie);
app.use('/batiment',Batiment);
app.use('/niveau',Niveau);
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
