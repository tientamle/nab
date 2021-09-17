var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// External Libraries.
require('dotenv').config();

// Project Router.
var indexRouter = require('./routes/index');
var eventsRouter = require('./routes/EventBusRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/', indexRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // render the error page
  res.status(404).json({
    message: 'NotFound',
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message || 'unknown',
  });
});

module.exports = app;
