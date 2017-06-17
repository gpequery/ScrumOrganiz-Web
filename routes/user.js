const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const User = models.User;

/* OFFLINE ACTIONS -> without session*/
    /* Add user if pseudo and mail is not already used (NO SESSION) */
    router.post('/addUser', function(req, res, next) {
        let userOk = services_add_user_verify_info(req.body.pseudo, req.body.email, req.body.password);

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
                let messages = allConfig.get('sign_up_message');

                if (user == null) {
                    User.create({
                        pseudo: req.body.pseudo,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
                    }).then(function(user) {
                        res.send({etat: true, message: messages.succes, idUser: user.id});
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

    /* Respond boolean correspond if user's information correspond an existing account (NO SESSION) */
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
                    res.send({etat: true, message: messages.success, idUser: user.id})
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

    /* Send mail for changePwd (forget) (NO SESSION) */
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
                let actions = allConfig.get('conf_email_orga:actions');

                sendMail(user.email, actions.forget_password, {id: user.id, pseudo: user.pseudo});
                res.send({etat: true, message: messages.send_success});
            } else {
                res.send({etat: false, message: messages.bad_account});
            }
        }).catch(function(err) {
            res.send({etat: false, message: err.toString()});
        });
    });

    /* User change pwd final (forget) (NO SESSION) */
    router.post('/changePwd', function(req, res, next) {
        let dataUrl = decodeURI(req.body.data).split(' ').join('+');
        let decodeDatas  = crypto.AES.decrypt(dataUrl, allConfig.get('conf_crypto:secrect_key')).toString(crypto.enc.Utf8);

        let allDatas = decodeDatas.split('&');
        let diff = howMinutesAgo(new Date(allDatas[2]));

        if (diff <= allConfig.get('conf_email_orga').minutes_forgetPwd) {
            let messages = allConfig.get('forget_password_message');

            User.findById(allDatas[1]).then(function(user) {
                user.update({password: bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync())});
                res.send({etat: true, message: messages.change_success});
            }).catch(function(error) {
                res.send({etat: false, message: messages.no_account_submit});
            });
        } else {
            res.render('includes/error.html.twig', {data: allConfig.get('conf_serveur:error:old_link')});
        }
    });

/* ONLINE ACTIONS -> with verify session */
    /* Verify if new info are valid (NO SESSION) */
    router.post('/verifyNewInfo', function(req, res, next) {
        let userOk = services_add_user_verify_info_without_password(req.body.pseudo, req.body.email);

        if (userOk.etat) {
            let options = {
                where : {
                    $or: [{
                        pseudo: req.body.pseudo
                    },{
                        email: req.body.email
                    }],
                    id: {
                        ne: req.session.userId
                    }
                }
            };

            User.findOne(options).then(function(user) {
                let messages = allConfig.get('sign_up_message');

                if (user == null) {
                    res.send({etat: true})
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

    /* Update with new info (SESSION) */
    router.post('/updateInfo', function(req, res, next) {
        if (verifySession(req)) {
            User.findById(req.session.userId).then(function(user) {
                if(user) {
                    user.update({pseudo: req.body.pseudo, email: req.body.email});

                    res.send({etat: true, message: allConfig.get('update_info_message:update_info_success')})
                } else {
                    res.send({etat: false, message: allConfig.get('session_message:reconnect')})
                }
            }).catch(function(error) {
                res.send({etat: false, message: error.toString()})
            });
        } else {
            res.send({etat: false, message: allConfig.get('session_message:reconnect')})
        }
    });

    /* Verify new password validy (NO SESSION) */
    router.post('/verifyNewPassword', function(req, res, next) {
        let result = services_verify_new_password(req.body.pwd1, req.body.pwd2);

        res.send({etat: result.etat, message: result.message});
    });

    /* update new password (SESSION)*/
    router.post('/updatePassword', function(req, res, next) {
        if (verifySession(req)) {
            if (req.body.pwd1 == req.body.pwd2) {
                User.findById(req.session.userId).then(function(user) {
                    if(user) {
                        let pwd = bcrypt.hashSync(req.body.pwd1, bcrypt.genSaltSync());
                        user.update({password: pwd});

                        res.send({etat: true, message: allConfig.get('update_info_message:update_info_success')})
                    } else {
                        res.send({etat: false, message: allConfig.get('session_message:reconnect')})
                    }

                }).catch(function(error) {
                    res.send({etat: false, message: error.toString()});
                });
            } else {
                res.send({etat: false, message: allConfig.get('update_info_message:same_password')});
            }
        } else {
            res.send({etat: false, message: allConfig.get('session_message:reconnect')})
        }
    });

module.exports = router;
