'use strict'

const express = require('express');
const authController = require('../../controllers/auth.controller');
const quizController = require('../../controllers/quiz.controller');
const { asyncHandler } = require('../../auth/authCheck');
const { verifyAccessToken } = require('../../auth/authUtils');
var multer = require('multer');
var upload = multer();
const router = express.Router();

//signUp
router.post('/register', asyncHandler(authController.registerUser))

//login
router.post('/login', asyncHandler(authController.loginUser))

//refresh-token
router.post('/refresh-token', asyncHandler(authController.requestRefreshToken))

//logout
router.post('/logout', asyncHandler(authController.logoutUser))

//over view
router.get('/overview', asyncHandler(authController.overView))

// =>> participant
router.use('/participant', verifyAccessToken, require('../participant'));

// =>> quiz
router.use('/quiz', verifyAccessToken, require('../quiz'));

//get quiz by participant
router.get("/quiz-by-participant", asyncHandler(quizController.getQuizByParticipant))

//post assign quiz to user
router.post('/quiz-assign-to-user', upload.none(), asyncHandler(quizController.assignQuizToUser))

//get quiz with Q/A
router.post('/quiz-with-qa', asyncHandler(quizController.getQuizWithQA))

//post quiz upsert qa
router.post('/quiz-upsert-qa', asyncHandler(quizController.upsertQuizWithQA))

// =>> question
router.use('/question', verifyAccessToken, require('../question'));

// =>> answer
router.use('/answer', verifyAccessToken, require('../answer'));

//hello world
router.get("/", (req, res) => {

    return res.status(200).json({
        message: 'Welcome'
    })
})

module.exports = router;