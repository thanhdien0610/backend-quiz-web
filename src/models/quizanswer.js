'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuizAnswer.belongsTo(models.QuizQuestion, {
        foreignKey: "question_id",
        as: "questionIdData"
      });
    }
  }
  QuizAnswer.init({
    description: DataTypes.STRING,
    correct_answer: DataTypes.BOOLEAN,
    question_id: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'QuizAnswer',
    paranoid: true,
    timestamps: true
  });
  return QuizAnswer;
};