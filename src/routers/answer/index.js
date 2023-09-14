`use strict`

const express = require('express');
const { asyncHandler } = require('../../auth/authCheck')

const router = express.Router();

//hello
router.get("/", (req, res) => {
    return res.status(200).json({
        message: 'Welcome from answer'
    })
})

module.exports = router;