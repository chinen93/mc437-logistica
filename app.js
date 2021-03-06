'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const session = require('express-session');

const site = require('./routes/site/index.js');
const api = require('./routes/api/index.js');
const err404 = require('./routes/404/index');

const app = express();

// Force HTTP redirection over HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    } else {
      next();
    }
  });
}

app.use(helmet());

app.use(helmet.hsts({
  maxAge: 10886400000,
  includeSubdomains: true,
  preload: true,
  force: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'HZPqZpGTM3JfdCSFfB3bv6sq3ZSWvPswhdJAdsBCBJGmBJDvRVXjZfs7NhhZqKS',
  name: 'oauth',
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());

app.use('/site', site);
app.use('/api', api);
app.use('/404', err404);

app.get('/', (req, res) => {
  res.redirect('/site');
});


// catch 404 and forward to error handler
app.use((req, res) => {
  res.redirect('/404');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  console.log('redirect', err);
  res.redirect('/404');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


module.exports = app;
