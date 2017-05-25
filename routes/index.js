const express = require('express');
const router = express.Router();
//const conf = require('nconf').file('config/_conf.json' );

/* GET home page. */
router.all('/', function(req, res, next) {
    res.render('home/home.html.twig');
});

/*A SUPPRIMER */
// router.get('/test', function(req, res, next) {
//     res.send('ok : ' + conf.get('database:port'));
// });

module.exports = router;
