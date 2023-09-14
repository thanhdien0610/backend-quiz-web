`use strict`

const { OK } = require("../core/success.response");
const QuizService = require("../services/quiz.service")

class QuizController {
    getAllQuiz = async (req, res, next) => {
        console.log(`[P]::GET ALL Quizzes::`)
        new OK({
            EM: `Get quizzes data succeed`,
            DT: await QuizService.getListQuiz()
        }).send(res)
    };

    getQuizById = async (req, res, next) => {
        console.log(`[P]::GET Quiz BY ID:: ${req.params}`)
        new OK({
            EM: `Get quiz data succeed`,
            DT: await QuizService.getQuizById(req.params)
        }).send(res)
    };

    postCreateQuiz = async (req, res, next) => {
        console.log(`[P]::POST CREATE Quiz:: `)
        const obj = JSON.parse(JSON.stringify(req.body))
        new CREATED({
            EM: `Create a new quiz succeed`,
            DT: await QuizService.postCreateNewQuiz(obj)
        }).send(res)
    };
    putUpdateQuiz = async (req, res, next) => {
        console.log(`[P]::PUT UPDATE Quiz:: `)
        const obj = JSON.parse(JSON.stringify(req.body))
        new CREATED({
            EM: `Update quiz succeed`,
            DT: await QuizService.putUpdateQuiz(obj)
        }).send(res)
    };
    deleteQuiz = async (req, res, next) => {
        console.log(`[P]::DELETE Quiz::`)
        new OK({
            EM: `Delete quiz succeed`,
            DT: await QuizService.deleteQuiz(req.body)
        }).send(res)
    };
    getQuizByParticipant = async (req, res, next) => {
        console.log(`[P]::GET Quiz BY Participant:: `)
        new OK({
            EM: `get Quiz By Participant succeed`,
            DT: await QuizService.getQuizByParticipant()
        }).send(res)
    };
    assignQuizToUser = async (req, res, next) => {
        console.log(`[P]::Assign quiz to user:: `)
        new OK({
            EM: `Assign the quiz to the current user succeed`,
            DT: await QuizService.assignQuizToUser(req.body)
        }).send(res)
    };
    getQuizWithQA = async (req, res, next) => {
        console.log(`[P]::Get Quiz with Q/A  :: `)
        new OK({
            EM: `Get Quiz with Q/A succeed`,
            DT: await QuizService.getQuizWithQA(req.params)
        }).send(res)
    };
    upsertQuizWithQA = async (req, res, next) => {
        console.log(`gg`)
    };
}


module.exports = new QuizController()