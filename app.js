const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const models = require('./models');
const nodemailer = require('nodemailer');
const session = require('cookie-session');
const helmet = require('helmet');

/* Config */
allConfig = require('nconf');
allConfig.add('conf', {type: 'file', file: 'config/_conf.json'});
allConfig.add('message', {type: 'file', file: 'config/_messages.json'});
allConfig.load();
/**/

const functions = require('./functions.js');
const bodyParser = require('body-parser');



const index = require('./routes/index');
const user = require('./routes/user');
const webService = require('./routes/web_services');
const service = require('./routes/services');

models.sequelize.sync();
// models.sequelize.sync({'force': 'true'});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'twig');


app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'logo', 'favicon-logo-only.ico')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(session({
        secret: allConfig.get('conf_session:secrect_key'),
        cookie: { secure: true }
}));

app.use('/', index);
app.use('/user', user);
app.use('/web_services', webService);
app.use('/services', service);


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