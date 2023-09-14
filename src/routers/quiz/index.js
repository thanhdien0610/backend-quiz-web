`use strict`

const express = require('express');
const { asyncHandler } = require('../../auth/authCheck');
const quizController = require('../../controllers/quiz.controller');
var multer = require('multer');
var upload = multer();

const router = express.Router();

//get all quiz
router.get("/all", asyncHandler(quizController.getAllQuiz))

//get quiz by id
router.get("/:id", asyncHandler(quizController.getQuizById))

//post create quiz
router.post('/', upload.none(), asyncHandler(quizController.postCreateQuiz))

//put update quiz
router.put('/', upload.none(), asyncHandler(quizController.putUpdateQuiz))

//delete quiz
router.delete('/', asyncHandler(quizController.deleteQuiz))


//hello
router.get("/", (req, res) => {
    return res.status(200).json({
        message: 'Welcome from quiz'
    })
})

module.exports = router;