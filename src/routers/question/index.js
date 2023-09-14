`use strict`

const express = require('express');
const { asyncHandler } = require('../../auth/authCheck')
const questionController = require('../../controllers/question.controller')
const router = express.Router();

//get all question
router.get("/all", asyncHandler(questionController.getAllQuestion))

//get question by id
router.get("/:id", asyncHandler(questionController.getQuestionById))

//hello
router.get("/", (req, res) => {
    return res.status(200).json({
        message: 'Welcome from question'
    })
})

module.exports = router;