'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener IDs para las referencias
    const dependencies = await queryInterface.sequelize.query(
      `SELECT Id FROM Dependency WHERE CustomId = 'DEP-A';`
    );
    const incharges = await queryInterface.sequelize.query(
      `SELECT Id FROM Incharge WHERE Email = 'luis@example.com';`
    );

    const dependencyId = dependencies[0][0].Id;
    const inchargeId = incharges[0][0].Id;

    await queryInterface.bulkInsert('Institution', [
      {
        Name: 'Institution 1',
        CustomId: 'INST-1',
        DependencyId: dependencyId,
        InchargeId: inchargeId
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Institution', null, {});
  }
};
