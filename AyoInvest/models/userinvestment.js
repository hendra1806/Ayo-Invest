'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInvestment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserInvestment.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserInvestment',
  });
  return UserInvestment;
};