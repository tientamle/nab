// Data Access Layer
const Sequelize = require('sequelize');
const config = require('../configs/database.js');
const dbConfig = config.db;
const dbPool = config.pool;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbPool.max,
    min: dbPool.min,
    acquire: dbPool.acquire,
    idle: dbPool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ActivityProfiler = require('./ActivityProfiler')(sequelize, Sequelize);

module.exports = db;
