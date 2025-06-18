// models/institution.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define('Institution', {
    Name: DataTypes.STRING(50),
    CustomId: DataTypes.STRING(50),
    DependencyId: DataTypes.INTEGER,
    InchargeId: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  Institution.associate = function(models) {
    Institution.belongsTo(models.Dependency, { foreignKey: 'DependencyId' });
    Institution.belongsTo(models.Incharge, { foreignKey: 'InchargeId' });
    Institution.hasMany(models.AcademicOffice, { foreignKey: 'InstitutionId' });
    Institution.hasMany(models.Delegation, { foreignKey: 'InstitutionId' });
  };
  return Institution;
};
