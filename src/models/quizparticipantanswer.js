'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizParticipantAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizParticipantAnswer.belongsTo(models.Participant, {
        foreignKey: "participant_id",
        as: "participantData"
      });
      QuizParticipantAnswer.belongsTo(models.Quiz, {
        foreignKey: "quiz_id",
        as: "quizData"
      });
      QuizParticipantAnswer.belongsTo(models.QuizQuestion, {
        foreignKey: "question_id",
        as: "question"
      })
    }
  }
  QuizParticipantAnswer.init({
    participant_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    user_answers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuizParticipantAnswer',
    paranoid: true,
    timestamps: true
  });
  return QuizParticipantAnswer;
};