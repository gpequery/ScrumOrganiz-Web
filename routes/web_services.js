const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const User = models.User;

/* add user with post url */
router.post('/addUser', function (req, res, next) {
    let servicesID = allConfig.get('conf_services:acces');
    let messages = allConfig.get('sign_up_message');

    if (bcrypt.compareSync(req.body.servicesLogin, servicesID.login) && bcrypt.compareSync(req.body.servicesPassword, servicesID.password)) {
        let userOk = services_add_user_verify_info(messages, allConfig.get('conf_user_rules'), req.body.pseudo, req.body.email, req.body.password);

        if (userOk.etat) {
            let options = {
                where: {
                    $or: [{
                        pseudo: req.body.pseudo
                    }, {
                        email: req.body.email
                    }]
                }
            };

            User.findOne(options).then(function (user) {
                if (user == null) {
                    User.create({
                        pseudo: req.body.pseudo,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
                    }).then(function (usr) {
                        res.send({etat: true, message: messages.succes})
                    }).catch(function (err) {
                        res.send({etat: false, message: err.toString()});
                    });
                } else {
                    if (user.pseudo.toLowerCase() == req.body.pseudo.toLowerCase()) {
                        res.send({etat: false, message: messages.pseudo_used});
                    } else {
                        res.send({etat: false, message: messages.mail_used});
                    }
                }
            }).catch(function (error) {
                res.send({etat: false, message: error.toString()});
            });
        } else {
            res.send({etat: false, message: userOk.message});
        }
    } else {
        res.send({etat: false, message: allConfig.get('services_message:acces_refused')});
    }
});

/* Respond boolean correspond if user's information correspond an existing account */
router.post('/loginUser', function(req, res, next) {
    let servicesID = allConfig.get('conf_services:acces');
    let messages = allConfig.get('login_message');

    if (bcrypt.compareSync(req.body.servicesLogin, servicesID.login) && bcrypt.compareSync(req.body.servicesPassword, servicesID.password)) {
        let options = {
            where : {
                pseudo: req.body.pseudo
            }
        };

        User.findOne(options).then(function(user) {
            if (user != null) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.send({etat: true, message: messages.success})
                } else {
                    res.send({etat: false, message: messages.bad_password})
                }
            } else {
                res.send({etat: false, message: messages.pseudo_no_exist});
            }
        }).catch(function(err) {
            res.send({etat: false, message: err.toString()});
        });
    } else {
        res.send({etat: false, message: allConfig.get('services_message:acces_refused')});
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
