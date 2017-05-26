const express = require('express');
const router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
    res.render('home/home.html.twig');
});

/* GET sign up page */
router.post('/signup', function (req, res, next) {
    res.render('home/signup.html.twig');
});

/* GET login page */
router.post('/login', function (req, res, next) {
    res.render('home/login.html.twig');
});

module.exports = router;
