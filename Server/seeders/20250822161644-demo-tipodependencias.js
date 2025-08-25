'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TipoDependencia', [
      {
        nombre: 'Regulativa',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
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
