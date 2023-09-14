'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeyToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KeyToken.belongsTo(models.Participant, {
        foreignKey: "participant_id",
        as: "participantData"
      })
    }
  }
  KeyToken.init({
    participant_id: DataTypes.INTEGER,
    public_key: DataTypes.STRING,
    private_key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KeyToken',
  });
  return KeyToken;
};