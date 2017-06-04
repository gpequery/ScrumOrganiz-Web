const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const User = models.User;

/* Add user if pseudo and mail is not already used */
router.post('/addUser', function(req, res, next) {
    let messages = allConfig.get('sign_up_message');
    let userOk = services_add_user_verify_info(messages, allConfig.get('conf_user_rules'), req.body.pseudo, req.body.email, req.body.password);

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
                    res.send({etat: true, message: messages.succes})
                }).catch(function(err) {
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
            res.send({etat: false, message: error.toString()});
        });
    } else {
        res.send({etat: false, message: userOk.message});
    }
});

/* Respond boolean correspond if user's information correspond an existing account */
router.post('/loginUser', function(req, res, next) {
    let messages = allConfig.get('login_message');

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
});

/* Send mail for changePwd */
router.post('/forgetPwd', function(req, res, next) {
    let messages = allConfig.get('forget_password_message');

    let options = {
        where : {
            pseudo: req.body.pseudo,
            email: req.body.email
        }
    };

    User.findOne(options).then(function(user) {
        if (user != null) {
            let actions = allConfig.get('conf_email_orga').actions;

            sendMail(user.email, actions.forget_password, {id: user.id, pseudo: user.pseudo});
            res.send({etat: true, message: messages.success});
        } else {
            res.send({etat: false, message: messages.bad_account});
        }
    }).catch(function(err) {
        res.send({etat: false, message: err.toString()});
    });

});

module.exports = router;
