let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


const blogRouter = require('./routes/blog-route');

let app = express();


// CORES: CROSS ORIGIN Resource sharing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"); 
  res.header("Access-Control-Allow-Headers", "Content-type"); 
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/', blogRouter);

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
