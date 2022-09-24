// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection  = require('./lib/db');
var usersRouter = require('./routes/users');
var mustacheExpress=require('mustache-express')
var app = express();
app.engine('mustache', mustacheExpress());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// console.log( path.join(__dirname, 'views'))
app.set('view engine', 'mustache');
// app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))

app.use(flash());
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3001);