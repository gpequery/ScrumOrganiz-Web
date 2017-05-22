const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('ok');
    // console.log('conf2 : ' + conf.get('database:host'));
    res.render('home/home.html.twig', { title: 'Express' });
});

module.exports = router;
