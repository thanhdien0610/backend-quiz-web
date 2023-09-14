'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParticipantQuiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ParticipantQuiz.belongsTo(models.Participant,{
      //   foreignKey:
      // })
    }
  }
  ParticipantQuiz.init({
    participant_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'Participant',
      //   key: 'id'
      // }
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'Quiz',
      //   key: 'id'
      // }
    },
    is_finish: DataTypes.BOOLEAN,
    time_start: DataTypes.DATE,
    time_end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ParticipantQuiz',
    paranoid: true,
    timestamps: true
  });
  return ParticipantQuiz;
};