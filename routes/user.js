const express = require('express');
const router = express.Router();

/* GET signup page */
router.post('/signup', function (req, res, next) {
    res.render('home/signup.html.twig');
});

module.exports = router;
