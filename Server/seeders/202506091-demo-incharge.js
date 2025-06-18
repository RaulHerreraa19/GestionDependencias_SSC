'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Incharge', [
      {
        Name: 'Luis',
        LastName: 'Martinez',
        Email: 'luis@example.com',
        Phone: '9876543210'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Incharge', null, {});
  }
};
