'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Delegaciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      custom_id: {
        type: Sequelize.STRING(50)
      },
      fun_delegacionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'FuncionDelegacions', // Nombre de la tabla
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,      
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Delegaciones');
  }
};
