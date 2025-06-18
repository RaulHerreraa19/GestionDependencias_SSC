'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      LastName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      Phone: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      CreatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      RoleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
