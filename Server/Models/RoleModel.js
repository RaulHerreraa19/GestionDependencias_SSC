// models/role.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.User, { foreignKey: 'RoleId' });
  };
  return Role;
};
