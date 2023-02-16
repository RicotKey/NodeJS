'use strict';
// email: DataTypes.STRING,
      // password: DataTypes.STRING,
      // firstName: DataTypes.STRING,
      // lastName: DataTypes.STRING,
      // address: DataTypes.STRING,
      // phonenumber: DataTypes.STRING,
      // gender: DataTypes.BOOLEAN,
      // image: DataTypes.STRING,
      // roleid: DataTypes.STRING,
      // positionid: DataTypes.STRING
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Amin',
      lastName: '1',
      address: 'Viet Nam',
      phonenumber: '0918278738',
      gender: 1,
      image: '/src',
      roleid: 'R1',
      positionid: '1',

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
