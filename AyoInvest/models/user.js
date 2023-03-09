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
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:`Nama harus diisi`
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:`Email harus diisi`
        },
        unique:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:`Password harus diisi`
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:`Role harus dipilih`
        },
        notNull:{
          msg:`Role Harus dipilih`
        }
      }
    },
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