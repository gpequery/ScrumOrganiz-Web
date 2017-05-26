const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const User = models.User;

/* GET sign up page */
router.post('/signup', function (req, res, next) {
    res.render('home/signup.html.twig');
});

/* GET login page */
router.post('/login', function (req, res, next) {
    res.render('home/login.html.twig');
});

/* Add user if pseudo and mail is not already used */
router.post('/addUser', function(req, res, next) {
    let messages = allConfig.get('sign_up_message');
    let userOk = services_add_user_verify_info(messages, allConfig.get('conf_services:user_rules'), req.body.pseudo, req.body.email, req.body.password);

    if (userOk.etat) {
        let options = {
            where : {
                $or: [{
                    pseudo: req.body.pseudo
                },{
                    email: req.body.email
                }]
            }
        };

        User.findOne(options).then(function(user) {
            if (user == null) {
                User.create({
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
                }).then(function(usr) {
                    res.send({etat: true})
                }).catch(function(err) {
                    console.warn('ERROR : ' + error);
                    res.send({etat: false, message: err.toString()});
                });
            } else {
                if (user.pseudo.toLowerCase() == req.body.pseudo.toLowerCase()) {
                    res.send({etat: false, message: messages.pseudo_used});
                } else {
                    res.send({etat: false, message: messages.mail_used});
                }
            }
        }).catch(function(error) {
            console.warn('ERROR : ' + error);
            res.send({etat: false, message: error.toString()});
        });
    } else {
        res.send({etat: false, message: userOk.message});
    }
});

module.exports = router;

function services_add_user_verify_info(messages, userRules, pseudo, email, password) {
    if (typeof pseudo == 'undefined' || pseudo.length < userRules.pseudo_min_length) {
        return {etat: false, message: messages.pseudo_min_length};
    }
    else if (!new RegExp(userRules.email_regex).test(email)) {
        return {etat: false, message: messages.mail_format};
    }
    else if (typeof password == 'undefined' || password.length < userRules.password_min_length) {
        return {etat: false, message: messages.password_min_length};
    } else {
        return {etat: true};
    }
}
