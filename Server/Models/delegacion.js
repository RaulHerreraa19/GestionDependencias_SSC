'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delegacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Delegacion.belongsTo(models.FuncionDelegacion, { foreignKey: 'fun_delegacionId' });
      Delegacion.hasMany(models.Dependencia, { foreignKey: 'delegacion_id' });
    }
  }

  
  Delegacion.init({
    nombre: DataTypes.STRING,
    custom_id: DataTypes.STRING,
    fun_delegacionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Delegacion',
    tableName: 'Delegaciones',
    freezeTableName: true,
  timestamps: true        
  });

  
  return Delegacion;
};

