const { Sequelize } = require('sequelize');
const config = require('./config.js');

const db = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    dialect: config.DB_DIALECT,
    host: config.HOST,
    port: config.DB_PORT,
    charset: 'utf8',
    login: true,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      //useUTC: false, //for reading from database
    },
    timezone: "-03:00", //for writing to database
    define: {
      timestamps: false,
      underscored: true,
  },
});

try {
    db.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = { db };
