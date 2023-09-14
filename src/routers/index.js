'use strict'

const express = require('express');

const router = express.Router();

//check apiKey
// router.use();

//check permission

router.use('/api/v1', require('./auth'))

module.exports = router;