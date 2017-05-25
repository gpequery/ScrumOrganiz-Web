const express = require('express');
const router = express.Router();
const models = require('../models');
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
                password: req.body.pwd
            }).then(function(usr) {
                res.send({etat: 'ok'})
            }).catch(function(err) {
                console.warn('ERROR : ' + error);
                res.send({etat: 'error', message: err});
            });
        } else {
            if (user.pseudo == req.body.pseudo) {
                res.send({etat: 'nok', message: 'Pseudo déjà utilisé'});
            } else {
                res.send({etat: 'nok', message: 'Mail déjà associé à un compte'});
            }
        }
    }).catch(function(error) {
        console.warn('ERROR : ' + error);
        res.send({etat: 'error', message: error});
    });
});

module.exports = router;
