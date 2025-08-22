'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dependencias', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      custom_id: {
        type: Sequelize.STRING(50)
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      delegacion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Delegaciones',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Funcionarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tipodependenciaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TipoDependencias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Dependencias');
  }
};
