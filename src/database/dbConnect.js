const { Sequelize } = require("sequelize");
const dbConfig = require("../utils/serverConfig");

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USERNAME,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,
    port: dbConfig.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
