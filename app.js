var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var models = require('./models');

/**/
allConfig = require('nconf');
allConfig.add('test', {type: 'file', file: 'config/_conf.json'});
allConfig.add('greg', {type: 'file', file: 'config/_messages.json'});
allConfig.load();

var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var webService = require('./routes/web_services');

models.sequelize.sync();
// models.sequelize.sync({'force': 'true'});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/user', user);
app.use('/web_services', webService);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
