const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const cors = require('cors');

const db = require('./config/database');
const port = process.env.PORT || 3900;
const logDirectory = path.join(__dirname, 'log');

const User = require('./model/user');
const userRouter = require('./routes/user.route');
const blogRouter = require('./routes/blog-route');

const app = express();



// Connect to MongoDB
mongoose.connect(db.uri, db.options).then(
  () => {
    console.log('MongoDB connected.')
  },
  err => {
    console.error('MongoDB error.:' + err)
  }
);


// Parse application/x-www-form-urlencoded + json
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//Logging
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});

app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400
}));


/* 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"); 
  res.header("Access-Control-Allow-Headers", "Content-type");
  next();
});*/
//enable CORS
app.use(cors());


// basic secure
app.use(helmet());


//Cookie handling
app.use(cookieParser());


//Session handling
app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: true,
    saveUninitialized: true
}));

//Passport Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// API routes
app.use('/blog', blogRouter);
app.use('/', userRouter);


//Start server
app.listen(port);
console.log('Server started on port' + port);
