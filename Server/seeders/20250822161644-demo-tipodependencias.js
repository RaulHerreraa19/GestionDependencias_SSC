'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TipoDependencia', [
      {
        id: 1,
        nombre: 'Regulativa',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: 2,
        nombre: 'Normativa',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
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
+    await queryInterface.bulkDelete('TipoDependencia', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
