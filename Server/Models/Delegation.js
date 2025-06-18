// models/delegation.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Delegation = sequelize.define('Delegation', {
    Name: DataTypes.STRING(50),
    CustomId: DataTypes.STRING(50),
    InstitutionId: DataTypes.INTEGER,
    InchargeId: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  Delegation.associate = function(models) {
    Delegation.belongsTo(models.Institution, { foreignKey: 'InstitutionId' });
    Delegation.belongsTo(models.Incharge, { foreignKey: 'InchargeId' });
    Delegation.belongsTo(models.DelegationsType, { foreignKey: 'TypeId' });
  };
  return Delegation;
};
