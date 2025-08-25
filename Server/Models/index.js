'use strict';
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);

const dbConfig = require('../config/config.json');
const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  dbConfig.development
);

const db = {};

// Cargar todos los modelos
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Ejecutar asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
