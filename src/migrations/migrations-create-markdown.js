'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdowns', {
            // contentHTML: DataTypes.TEXT('long'),
            // contentMarkdown: DataTypes.TEXT('long'),
            // description: DataTypes.TEXT('long'),
            // doctorid: DataTypes.INTEGER,
            // specialtyid: DataTypes.INTEGER,
            // clinicid: DataTypes.INTEGER
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            doctorid: {
                type: Sequelize.INTEGER
            },
            specialtyid: {
                type: Sequelize.INTEGER
            },
            clinicid: {
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
        await queryInterface.dropTable('markdowns');
    }
};