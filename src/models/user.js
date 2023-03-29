'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, { foreignKey: 'positionid', targetKey: 'keyMap', as: 'positionData' }),
        User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' }),
        User.belongsTo(models.Allcode, { foreignKey: 'roleid', targetKey: 'keyMap', as: 'roleData' }),
        User.hasOne(models.Markdown, { foreignKey: 'doctorid' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleid: DataTypes.STRING,
    positionid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};