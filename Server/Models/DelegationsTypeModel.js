// models/delegationstype.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const DelegationsType = sequelize.define('DelegationsType', {
    Name: DataTypes.STRING(50)
  }, {
    timestamps: false
  });
  DelegationsType.associate = function(models) {
    DelegationsType.hasMany(models.Delegation, { foreignKey: 'TypeId' });
  };
  return DelegationsType;
};
