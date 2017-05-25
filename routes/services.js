const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const User = models.User;

router.post('/', function(req, res, next) {
    res.send('ok');
});

module.exports = router;
