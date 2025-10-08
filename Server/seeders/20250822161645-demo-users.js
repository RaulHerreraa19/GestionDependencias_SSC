"use strict";
const bcrypt = require("bcrypt"); // ✅ Importa bcrypt

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "test@test.com",
          nombre: "John",
          apellido: "Doe",
          password: hashedPassword,
          telefono: "1234567890",
          roleId: 1,
        },
      ],
      {}
    );
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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
