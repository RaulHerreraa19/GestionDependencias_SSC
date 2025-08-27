'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    //   },
    //   custom_id: {
    //     type: Sequelize.STRING(50)
    //   },
    //   nombre: {
    //     type: Sequelize.STRING(100),
    //     allowNull: false
    //   },
    //   delegacion_id: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'Delegaciones',
    //       key: 'id'
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL'
    //   },
    //   funcionario_id: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'Funcionarios',
    //       key: 'id'
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL'
    //   },
    //   tipodependenciaId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'TipoDependencia',
    //       key: 'id'
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'SET NULL'
    //   },
    //   createdAt: Sequelize.DATE,
    //   updatedAt: Sequelize.DATE
    // });

    await queryInterface.bulkInsert('Dependencias', [
      {
        nombre: 'Delegación Colima',
        custom_id: 'DEL-001',
        delegacion_id: 1,
        funcionario_id: 1,
        tipodependenciaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        nombre: 'Delegación Manzanillo',
        custom_id: 'DEL-002',
        delegacion_id: 2,
        funcionario_id: 2,
        tipodependenciaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete('Dependencias', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
