'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.hasOne(models.KeyToken, {
        foreignKey: 'id',
        as: 'idForKeyTokenData',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Participant.belongsToMany(models.Quiz, {
        through: 'ParticipantQuiz',
        foreignKey: 'participant_id',
        otherKey: 'quiz_id'
      });
      Participant.hasOne(models.QuizParticipantAnswer, {
        foreignKey: 'id',
        as: 'idForQuizParticipantAnswerData',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Participant.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
    refresh_token: DataTypes.STRING,
    refresh_expired: DataTypes.DATE,

  }, {
    sequelize,
    modelName: 'Participant',
    paranoid: true,
    timestamps: true
  });
  return Participant;
};