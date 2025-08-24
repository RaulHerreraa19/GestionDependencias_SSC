'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dependencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dependencia.belongsTo(models.Delegacion, { foreignKey: 'delegacion_id' });
      Dependencia.belongsTo(models.Funcionario, { foreignKey: 'funcionario_id' });
      Dependencia.belongsTo(models.TipoDependencia, { foreignKey: 'tipodependenciaId' });
      
    }
  }
  Dependencia.init({
    custom_id: DataTypes.STRING,
    nombre: DataTypes.STRING,
    delegacion_id: DataTypes.INTEGER,
    funcionario_id: DataTypes.INTEGER,
    tipodependenciaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dependencia',
  });
  return Dependencia;
};