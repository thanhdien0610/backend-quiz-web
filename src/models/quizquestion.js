'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizQuestion.belongsTo(models.Quiz, {
        foreignKey: "quiz_id",
        as: "quizIdData"
      });
      QuizQuestion.hasMany(models.QuizAnswer, {
        foreignKey: 'id',
        as: 'idForQuizQuestionData',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      QuizQuestion.hasOne(models.QuizParticipantAnswer, {
        foreignKey: 'id',
        as: 'idForQuizParticipantAnswerData',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  QuizQuestion.init({
    description: DataTypes.STRING,
    image: DataTypes.BLOB("long"),
    quiz_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizQuestion',
    paranoid: true,
    timestamps: true
  });
  return QuizQuestion;
};