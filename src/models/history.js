'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Quiz, {
        foreignKey: "quiz_id",
        as: "quizData"
      });
    }
  }
  History.init({
    participant_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    total_questions: DataTypes.INTEGER,
    total_correct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
    paranoid: true,
    timestamps: true
  });
  return History;
};