'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  User.findAll({
    include: [{
      model: sequelize.models.Role,
      as: 'role'
    }]
  }).then(users => {
    console.log(users);
  }).catch(err => {
    console.error('Error fetching users:', err);
  });

  User.findByPk(1, {
    include: [{
      model: sequelize.models.Role,
      as: 'role'
    }]
  }).then(user => {
    console.log(user);
  }).catch(err => {
    console.error('Error fetching user by ID:', err);
  });

  User.create(user,{
    nombre: user.name,
    apellido: user.lastName,
    roleId: user.roleId
  }).then(newUser => {
    console.log('User created:', newUser);
  }
  ).catch(err => {
    console.error('Error creating user:', err);

  });
}
return User;

