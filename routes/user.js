const express = require('express');
const router = express.Router();
const models = require('../models');
const conf = require('nconf').file('config/_conf.json');
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
    let userOk = services_add_user_verify_info(conf.get('services:user_rules'), req.body.pseudo, req.body.email, req.body.password);

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
                    res.send({etat: false, message: 'Pseudo déjà utilisé'});
                } else {
                    res.send({etat: false, message: 'Mail déjà associé à un compte'});
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

function services_add_user_verify_info(userRules, pseudo, email, password) {
    if (typeof pseudo == 'undefined' || pseudo.length < userRules.pseudo_min_length) {
        return {etat: false, message: 'Pseudo : au moins ' + userRules.pseudo_min_length + ' caractères.'};
    }
    else if (!new RegExp(userRules.email_regex).test(email)) {
        return {etat: false, message: 'Email : veuillez saisir une adresse valide'};
    }
    else if (typeof password == 'undefined' || password.length < userRules.password_min_length) {
        return {etat: false, message: 'Mot de passe : au moins ' + userRules.password_min_length + ' caractères.'};
    } else {
        return {etat: true};
    }
}
