const express = require('express');
const router = express.Router();
const models = require('../models');
const Project = models.Project;


/* Add project if title and description exist and not exist */
router.post('/addProject', function (req, res, next) {
    if (verifySession(req)) {
        let message = allConfig.get('project_message:add');

        if (req.body.name != '' && req.body.description != '') {
            let options = {
                where: {
                    label: req.body.name
                }
            };

            Project.findOne(options).then(function (searchProject) {
                if (searchProject) {
                    return false;
                } else {
                    return Project.create({
                        creatorId: req.session.userId,
                        label: req.body.name,
                        description: req.body.description
                    });
                }
            }).then(function (newProject) {
                if (newProject) {
                    res.json({etat: true, message: message.success, project: newProject});
                } else {
                    res.json({etat: false, message: message.project_exist});
                }
            }).catch(function (error) {
                res.json({etat: false, message: error.toString()});
            });
        } else {
            res.json({etat: false, message: req.body.name == '' ? message.no_name : message.no_description});
        }
    } else {
        res.json({etat: false, message: allConfig.get('session_message:reconnect')})
    }
});


module.exports = router;
