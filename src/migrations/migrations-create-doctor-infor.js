'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_infor', {
            // doctorid: DataTypes.INTEGER,
            // priceid: DataTypes.STRING,
            // provinceid: DataTypes.STRING,
            // paymentid: DataTypes.STRING,
            // addressClinic: DataTypes.STRING,
            // nameClinic: DataTypes.STRING,
            // note: DataTypes.STRING,
            // count: DataTypes.INTEGER
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorid: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provinceid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            addressClinic: {
                type: Sequelize.STRING
            },
            nameClinic: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor_infor');
    }
};