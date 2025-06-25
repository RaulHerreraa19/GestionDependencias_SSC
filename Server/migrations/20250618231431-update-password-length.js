'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'Password', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'Password', {
      type: Sequelize.STRING(50), // tamaño actual
      allowNull: false
    });
  }
};
