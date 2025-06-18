'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const institutions = await queryInterface.sequelize.query(
      `SELECT Id FROM Institution WHERE CustomId = 'INST-1';`
    );
    const incharges = await queryInterface.sequelize.query(
      `SELECT Id FROM Incharge WHERE Email = 'luis@example.com';`
    );
    const types = await queryInterface.sequelize.query(
      `SELECT Id FROM DelegationsType WHERE Name = 'Type 1';`
    );

    const institutionId = institutions[0][0].Id;
    const inchargeId = incharges[0][0].Id;
    const typeId = types[0][0].Id;

    await queryInterface.bulkInsert('Delegation', [
      {
        Name: 'Delegation 1',
        CustomId: 'DEL-1',
        InstitutionId: institutionId,
        InchargeId: inchargeId,
        TypeId: typeId
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Delegation', null, {});
  }
};
