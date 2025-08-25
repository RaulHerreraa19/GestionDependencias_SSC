'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   nombre: {
    //     type: Sequelize.STRING
    //   },
    //   correo: {
    //     type: Sequelize.STRING
    //   },
    //   telefono: {
    //     type: Sequelize.STRING
    //   },
    //   cargo: {
    //     type: Sequelize.STRING
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    await queryInterface.bulkInsert('Funcionarios', [
      {
        nombre: 'Funcionario 1',
        correo: 'correo1@ejemplo.com',
        telefono: '123456789',
        cargo: 'Descripción del funcionario 1',
        createdAt: new Date(),        
        updatedAt: new Date(),
      },
      {
        nombre: 'Funcionario 2',
        correo: 'correo2@ejemplo.com',
        telefono: '987654321',
        cargo: 'Descripción del funcionario 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
    /**
     * 
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
    await queryInterface.bulkDelete('Funcionarios', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
