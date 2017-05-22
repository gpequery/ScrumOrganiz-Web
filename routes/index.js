const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    log.warning('COUCOU');
    res.render('index.html.twig', { title: 'Express' });
});

module.exports = router;
