'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoDependencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoDependencia.hasMany(models.Dependencia, { foreignKey: 'tipodependenciaId' });
      
    }
  }
  TipoDependencia.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoDependencia',
  });
  return TipoDependencia;
};