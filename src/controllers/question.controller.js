`use strict`

const { OK } = require("../core/success.response");
const QuestionService = require("../services/question.service")

class QuestionController {
    getAllQuestion = async (req, res, next) => {
        console.log(`[P]::GET ALL QUESTIONS::`)
        new OK({
            EM: `Get questions data succeed`,
            DT: await QuestionService.getListQuestion()
        }).send(res)
    };

    getQuestionById = async (req, res, next) => {
        console.log(`[P]::GET QUESTION BY ID:: ${req.params}`)
        new OK({
            EM: `Get question data succeed`,
            DT: await QuestionService.getQuestionById(req.params)
        }).send(res)
    }
}


module.exports = new QuestionController()