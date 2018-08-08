var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var contacts = require('./routes/contacts'); 

var app = express();

var elastic = require('./elasticsearch');  

elastic.indexExists().then(function (exists) {  
  if (exists) {
    return elastic.deleteIndex();
  }
}).then(function () {
  return elastic.initIndex().then(elastic.initMapping).then(function () {
    //Add a few titles for the autocomplete
    //elasticsearch offers a bulk functionality as well, but this is for a different time
    var promises = [
      'Gowtham',
      'Ashok',
      'Smith',
      'John',
      'Jane'
    ].map(function (contact) {
      return elastic.addContact({
        name: contact,
        email: contact + " @gmail.com",
        metadata: {
          contactLength: contact.length
        }
      });
    });
    return Promise.all(promises);
  });
}); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/contact', contacts);

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
