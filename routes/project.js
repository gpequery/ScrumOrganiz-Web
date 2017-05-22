'use strict';

const express = require('express');
const models = require('../models');
const Project = models.Project;
const router = express.Router();

router.post('/', function(req, res) {
    let t = req.body.title;
    let d = req.body.description;
    let rd = req.body.release_date;

    Project.create({
        title: t,
        description: d,
        release_date: rd
    }).then(function(project) {
        res.json(project);
    }).catch(function(err) {
        res.json({
            result: -1 //SEQUELIZE ERROR
        })
    });
});

module.exports = router;
