'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quiz.belongsToMany(models.Participant, {
        through: 'ParticipantQuiz',
        foreignKey: 'quiz_id',
        otherKey: 'participant_id'
      });
      Quiz.hasMany(models.QuizQuestion, {
        foreignKey: 'id',
        as: 'idForQuizData',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Quiz.hasOne(models.QuizParticipantAnswer, {
        foreignKey: 'id',
        as: 'idForQuizParticipantAnswerData',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Quiz.hasOne(models.History, {
        foreignKey: 'id',
        as: 'idForHistoryData',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Quiz.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    image: DataTypes.BLOB("long")
  }, {
    sequelize,
    modelName: 'Quiz',
    paranoid: true,
    timestamps: true
  });
  return Quiz;
};