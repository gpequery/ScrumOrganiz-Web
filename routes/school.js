'use strict';

const express = require('express');
const models = require('../models');
const School = models.School;
const router = express.Router();

router.post('/', function(req, res) {
    let l = req.body.name;

    School.create({
        name: l
    }).then(function(school) {
        res.json(school);
    }).catch(function(err) {
        res.json({
            result: -1 //SEQUELIZE ERROR
        })
    });
});

router.get('/', function(req, res) {
    let l = parseInt(req.query.limit) || 20;
    let o = parseInt(req.query.offset) || 0;
    let options = {
        limit: l,
        offset: o
    }
    School.findAll(options).then(function(schools) {
        //res.render('index.html.twig', {name: 'Greg'});
        let result = [];

        for (let school of schools) {
            result.push(school.responsify());
        }
        res.json(result);
    }).catch(function(err) {
        res.json({
            result: -1 //SEQUELIZE ERROR
        })
    })
});


router.get('/:school_id', function(req, res) {
    let options = {
        where: {
            id: req.params.school_id
        }
    };

    School.find(options).then(function(school) {
        res.json(school.responsify());
    }).catch(function(err) {
        res.json({
            result: 404
        })
    })
})

module.exports = router;
