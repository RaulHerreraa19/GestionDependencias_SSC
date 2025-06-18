'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await queryInterface.sequelize.query(
      `SELECT Id FROM Roles WHERE Name = 'Admin';`
    );
    const adminRoleId = roles[0][0].Id;

    await queryInterface.bulkInsert('Users', [
      {
        Name: 'Raul',
        LastName: 'Herrera',
        Email: 'raul@example.com',
        Password: 'hashed_password_here',
        Phone: '1234567890',
        CreatedAt: new Date(),
        RoleId: adminRoleId
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
