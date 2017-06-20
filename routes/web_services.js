const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const User = models.User;
const Project = models.Project;

/* add user with post url */
router.post('/addUser', function (req, res, next) {
    let servicesID = allConfig.get('conf_services:acces');

    if (bcrypt.compareSync(req.body.servicesLogin, servicesID.login) && bcrypt.compareSync(req.body.servicesPassword, servicesID.password)) {
        let userOk = services_add_user_verify_info(req.body.pseudo, req.body.email, req.body.password);

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
                let messages = allConfig.get('sign_up_message');

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

/* Change PWD : idUser & newPwd */
router.post('/changePwd', function(req, res, next) {
    let servicesID = allConfig.get('conf_services:acces');
    let messages = allConfig.get('services_message');

    if (bcrypt.compareSync(req.body.servicesLogin, servicesID.login) && bcrypt.compareSync(req.body.servicesPassword, servicesID.password)) {
        User.findById(req.body.id).then(function(user) {
            user.update({password: bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync())});
            res.send({etat: true, message: messages.pwd_change_success});
        }).catch(function(error) {
            res.send({etat: false, message: messages.pwd_change_failed});
        });
    } else {
        res.send({etat: false, message: messages.acces_refused});
    }
});

router.post('/addNewProject', function(req, res, next) {
    let servicesID = allConfig.get('conf_services:acces');
    let messages = allConfig.get('services_message');

    if (bcrypt.compareSync(req.body.servicesLogin, servicesID.login) && bcrypt.compareSync(req.body.servicesPassword, servicesID.password)) {
        let message = allConfig.get('project_message:add');

        if (req.body.label != '' && req.body.description != '') {
            let options = {
                where: {
                    label: req.body.label
                }
            };

            Project.findOne(options).then(function (searchProject) {
                if (searchProject) {
                    console.log('1');
                    return false;
                } else {
                    console.log('2');
                    return Project.create({
                        creatorId: req.body.userId,
                        label: req.body.label,
                        description: req.body.description
                    });
                }
            }).then(function (newProject) {
                if (newProject) {
                    console.log('3');
                    res.json({etat: true, message: message.success, project: newProject});
                } else {
                    console.log('4');
                    res.json({etat: false, message: message.project_exist});
                }
            }).catch(function (error) {
                res.json({etat: false, message: error.toString()});
            });
        } else {
            res.json({etat: false, message: req.body.label == '' ? message.no_name : message.no_description});
        }
    } else {
        res.json({etat: false, message: messages.acces_refused});
    }
});

module.exports = router;