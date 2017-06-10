const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');
const url = require('url');

/* GET home page. */
router.all('/', function(req, res, next) {
    res.render('home/home.html.twig');
});

/* GET sign up page with data : confUser */
router.post('/signup', function (req, res, next) {
    res.render('home/signup.html.twig', {conf: allConfig.get('conf_user_rules')});
});

/* GET login page with data : confUser */
router.post('/login', function (req, res, next) {
    res.render('home/login.html.twig', {conf: allConfig.get('conf_user_rules')});
});

/* GET board page */
router.post('/board', function (req, res, next) {
    res.render('general/board.html.twig');
});

/* GET login page */
router.post('/forgetPwd', function (req, res, next) {
    res.render('home/forgetPwd.html.twig', {conf: allConfig.get('conf_user_rules')});
});

/* Decrypte infos send by mail and verify date */
router.get('/changePwdBefore', function (req, res, next) {
    let dataUrl = decodeURI(req.query.data).split(' ').join('+');
    let decodeDatas  = crypto.AES.decrypt(dataUrl, allConfig.get('conf_crypto').secrect_key).toString(crypto.enc.Utf8);
    
    let allDatas = decodeDatas.split('&');
    let diff = howMinutesAgo(new Date(allDatas[2]));

    if (diff <= allConfig.get('conf_email_orga').minutes_forgetPwd) {
        res.render('home/changePwd.html.twig', {data: dataUrl, conf: allConfig.get('conf_user_rules')});
    } else {
        res.render('generals/error.html.twig', {data: allConfig.get('conf_serveur').error.old_link});
    }
});

module.exports = router;
