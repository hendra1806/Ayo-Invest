'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Investment,{
        through : models.UserInvestment
      })
      this.belongsTo(models.Wallet)
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    WalletId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,option)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password,salt)
    instance.password=hash
  })
  return User;
};