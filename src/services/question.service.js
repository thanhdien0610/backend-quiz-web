const db = require('../models/index');

const _ = require('lodash')
class QuestionService {

    static selectAllQuestionFromDB = async () => {
        return await db.QuizQuestion.findAll()
    }

    static selectQuestionByIdFromDB = async (id) => {
        return await db.QuizQuestion.findOne({
            where: {
                id: id
            }
        })
    }
    static getListQuestion = async () => {
        const result = await this.selectAllQuestionFromDB()
        let output = []
        for (let i = 0; i < result.length; i++) {
            if (!_.isNull(result[i].dataValues.image)) {
                result[i].dataValues.image = result[i].dataValues.image.toString('base64')
            }
            // console.log(_.isNull(result[i].dataValues.image))
            output.push(result[i].dataValues)
        }

        // console.log(result)
        return output
    }

    static getQuestionById = async ({ id }) => {
        const result = await this.selectQuestionByIdFromDB(+id)
        result.dataValues.image = result.dataValues.image.toString('base64')
        if (!result)
            return null
        return result.dataValues
    }
}

module.exports = QuestionService