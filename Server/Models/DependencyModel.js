// models/dependency.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dependency = sequelize.define('Dependency', {
    Name: DataTypes.STRING(50),
    CustomId: DataTypes.STRING(50)
  }, {
    timestamps: false
  });
  Dependency.associate = function(models) {
    Dependency.hasMany(models.Institution, { foreignKey: 'DependencyId' });
  };
  return Dependency;
};
