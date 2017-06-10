const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');

/* GET cryptage page */
router.get('/cryptage', function (req, res, next) {
    res.render('services/cryptage.html.twig');
});

/* GET result cryptage */
router.post('/cryptage/result', function (req, res, next) {
    let result;
    if (req.body.method == 'bcrypt') {
        result = bcrypt.hashSync(req.body.value, bcrypt.genSaltSync());
    } else {
        if (req.body.action == 'crypt') {
            result = encodeURI(crypto.AES.encrypt(req.body.value, allConfig.get('conf_crypto').secrect_key));
        } else {
            result = crypto.AES.decrypt(req.body.value, allConfig.get('conf_crypto').secrect_key).toString(crypto.enc.Utf8);
        }

    }


    res.send(result);
});

module.exports = router;
