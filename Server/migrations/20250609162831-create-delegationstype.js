'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DelegationsType', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DelegationsType');
  }
};
