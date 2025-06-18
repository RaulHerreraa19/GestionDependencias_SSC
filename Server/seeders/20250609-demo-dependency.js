'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Dependency', [  // 🚨 1. Nombre de tabla debe ser en plural
      { 
        Name: 'Dependency A', 
        CustomId: 'DEP-A',
      },
      { 
        Name: 'Dependency B', 
        CustomId: 'DEP-B',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dependencies', null, {});  // Usar mismo nombre que en up()
  }
};