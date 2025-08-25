'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Delegaciones', [
      {
        nombre: 'Delegación 1',        
        custom_id: 'DEL-001',
        fun_delegacionId: 9,
      },
      {
        nombre: 'Delegación 2',
        custom_id: 'DEL-002',
        fun_delegacionId: 10,
      }
    ]);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Delegaciones', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

