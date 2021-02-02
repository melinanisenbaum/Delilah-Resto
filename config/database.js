const config = require('./config.js');
const { Sequelize } = require('sequelize');

//const dotenv = require('dotenv');
//dotenv.config({ path: './.env'});

const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
  dialect: config.DB_DIALECT,
  host: config.HOST,
  port: config.DB_PORT,
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = sequelize;
