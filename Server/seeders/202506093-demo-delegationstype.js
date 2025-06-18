'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DelegationsType', [
      { Name: 'Type 1' },
      { Name: 'Type 2' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DelegationsType', null, {});
  }
};
