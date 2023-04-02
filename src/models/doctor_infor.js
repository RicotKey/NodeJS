'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Doctor_Infor.belongsTo(models.User, { foreignKey: 'doctorid' })

            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'priceid', targetKey: 'keyMap', as: 'priceTypeData' })
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceid', targetKey: 'keyMap', as: 'provinceTypeData' })
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentid', targetKey: 'keyMap', as: 'paymentTypeData' })
        }
    };
    Doctor_Infor.init({
        doctorid: DataTypes.INTEGER,
        specialtyid: DataTypes.INTEGER,
        clinicid: DataTypes.INTEGER,
        priceid: DataTypes.STRING,
        provinceid: DataTypes.STRING,
        paymentid: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
        freezeTableName: true
    });
    return Doctor_Infor;
};