const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');

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

/* GET login page */
router.post('/forgetPwd', function (req, res, next) {
    res.render('home/forgetPwd.html.twig');
});

/* Decrypte infos send by mail and verify date */
router.get('/changePwdBefore', function (req, res, next) {
    let dataUrl = decodeURI(req.query.data).split(' ').join('+');
    let decodeDatas  = crypto.AES.decrypt(dataUrl, allConfig.get('conf_crypto').secrect_key).toString(crypto.enc.Utf8);


    let allDatas = decodeDatas.split('&');

    let id = allDatas[1];
    let diff = howMinutesAgo(new Date(allDatas[2]));

    console.log('conf : ' + allConfig.get('conf_email_orga').minutes_forgetPwd);

    res.send(dataUrl + ' : ' + decodeDatas);
});

module.exports = router;