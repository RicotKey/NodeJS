'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: 'positionid', as: 'positionData' }),
        Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' }),
        Allcode.hasMany(models.User, { foreignKey: 'roleid', as: 'roleData' })
      Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })

      Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceid', as: 'priceTypeData' })
      Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'provinceid', as: 'provinceTypeData' })
      Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentid', as: 'paymentTypeData' })
    }

  };
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueVi: DataTypes.STRING,
    valueEn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};