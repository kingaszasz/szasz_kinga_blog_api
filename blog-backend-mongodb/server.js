const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./config/database')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const https = require('https');

const blogRouter = require('./routes/blog-route')
const app = express()


// Connect to MongoDB
mongoose.connect(db.uri, db.options).then(
  () => {
    console.log('MongoDB connected.')
  },
  err => {
    console.error('MongoDB error.:' + err)
  }
)

// Get view File Path
/*function view (path) {
  return __dirname + '/views/' + path
}*/

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// Parse application/json
app.use(bodyParser.json())

// logging
app.use(morgan('dev', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"); 
  res.header("Access-Control-Allow-Headers", "Content-type");
  next();
});

// basic secure
app.use(helmet())

// Start Browser-Sync

if (app.get('env') === 'development') {
  const browserSync = require('browser-sync')
  const config = {
    files: ['views/**/*.html'],
    logLevel: 'info',
    logSnippet: false,
    reloadDelay: 3000,
    reloadOnRestart: true
  }
  const bs = browserSync(config)
  app.use(require('connect-browser-sync')(bs))
}

// Post API route
app.use('/blog', blogRouter)


app.listen('3900');

