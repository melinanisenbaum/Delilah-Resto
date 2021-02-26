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
  }
);

try {
    db.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

// db.auth = require('../models/auth')(Sequelize);
// db.order = require('../models/order')(Sequelize);
// db.order_product = require('../models/order_product')(Sequelize);
// db.payment = require('../models/payment')(Sequelize);
// db.product = require('../models/product')(Sequelize);
// db.status = require('../models/status')(Sequelize);
// db.user = require('../models/user')(Sequelize);

// db.auth.belongsTo(db.user);
// db.user.hasMany(db.auth);

// db.order.belongsTo(db.user);
// db.user.hasMany(db.order);

// db.order.belongsTo(db.status);
// db.status.hasMany(db.order);

// db.order.belongsTo(db.payment);
// db.payment.hasMany(db.order);

// db.order_product.belongsTo(db.user);
// db.user.hasMany(db.order_product);

// db.order_product.belongsTo(db.order);
// db.order.hasMany(db.order_product);

// db.order_product.belongsTo(db.product);
// db.product.hasMany(db.order_product);

module.exports = { db };
