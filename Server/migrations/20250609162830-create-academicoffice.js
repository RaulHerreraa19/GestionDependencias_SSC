'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AcademicOffice', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      CustomId: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      InstitutionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Institution',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      InchargeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Incharge',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }); 
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AcademicOffice');
  }
};
