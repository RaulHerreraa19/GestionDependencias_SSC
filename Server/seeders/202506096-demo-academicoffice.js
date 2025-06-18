'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const institutions = await queryInterface.sequelize.query(
      `SELECT Id FROM Institution WHERE CustomId = 'INST-1';`
    );
    const incharges = await queryInterface.sequelize.query(
      `SELECT Id FROM Incharge WHERE Email = 'luis@example.com';`
    );

    const institutionId = institutions[0][0].Id;
    const inchargeId = incharges[0][0].Id;

    await queryInterface.bulkInsert('AcademicOffice', [
      {
        Name: 'Academic Office 1',
        CustomId: 'AO-1',
        InstitutionId: institutionId,
        InchargeId: inchargeId
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AcademicOffice', null, {});
  }
};
