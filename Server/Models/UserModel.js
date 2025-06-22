const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate que esta sea tu instancia válida de Sequelize

class UsersModel {
  static initModel() {
    UsersModel.model = sequelize.define('User', {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      LastName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Password: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Phone: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'Users',
      timestamps: false // o true si tienes createdAt y updatedAt
    });
  }

  static async getAll() {
    if (!UsersModel.model) {
      throw new Error('Modelo no inicializado. Llama primero a UsersModel.initModel()');
    }

    return await UsersModel.model.findAll({ attributes: { exclude: ['Password'] } });
  }
    static async findByPk(id) {
        if (!UsersModel.model) {
        throw new Error('Modelo no inicializado. Llama primero a UsersModel.initModel()');
        }
    
        return await UsersModel.model.findByPk(id);
    }    

    static async create(user) {
        if (!UsersModel.model) {
            throw new Error('Modelo no inicializado. Llama primero a UsersModel.initModel()');
        }

        return await UsersModel.model.create(user);
    }
}

module.exports = UsersModel;
