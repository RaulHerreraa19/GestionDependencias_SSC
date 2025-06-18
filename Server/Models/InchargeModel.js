// models/incharge.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Incharge = sequelize.define('Incharge', {
    Name: DataTypes.STRING(50),
    LastName: DataTypes.STRING(50),
    Email: DataTypes.STRING(50),
    Phone: DataTypes.STRING(50)
  }, {
    timestamps: false
  });
  Incharge.associate = function(models) {
    Incharge.hasMany(models.Institution, { foreignKey: 'InchargeId' });
    Incharge.hasMany(models.AcademicOffice, { foreignKey: 'InchargeId' });
    Incharge.hasMany(models.Delegation, { foreignKey: 'InchargeId' });
    
  };
  return Incharge;
};
