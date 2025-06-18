// models/academicoffice.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const AcademicOffice = sequelize.define('AcademicOffice', {
    Name: DataTypes.STRING(50),
    CustomId: DataTypes.STRING(50),
    InstitutionId: DataTypes.INTEGER,
    InchargeId: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  AcademicOffice.associate = function(models) {
    AcademicOffice.belongsTo(models.Institution, { foreignKey: 'InstitutionId' });
    AcademicOffice.belongsTo(models.Incharge, { foreignKey: 'InchargeId' });
  };
  return AcademicOffice;
};
