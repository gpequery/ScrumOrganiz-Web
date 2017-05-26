const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const User = models.User;

/* GET sign up page */
router.post('/signup', function (req, res, next) {
    res.render('home/signup.html.twig');
});

/* Add user if pseudo and mail is not already used */
router.post('/addUser', function(req, res, next) {
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
                password: bcrypt.hashSync(req.body.pwd, bcrypt.genSaltSync())
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
});

module.exports = router;
