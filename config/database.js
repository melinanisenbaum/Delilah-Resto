const { Sequelize } = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    dialect: config.DB_DIALECT,
    host: config.HOST,
    port: config.DB_PORT,
    login: true,   
    dialectOptions: {
      charset: 'utf8'
    },
    timezone: "-03:00", //for writing to database
    define: {
      timestamps: false,
      underscored: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    }
  }
);

//sequelize.sync();//crea nuevas tablas de acuerdo a los modelos

try {
    sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = sequelize;

//   db.Sequelize = Sequelize;
//   db.sequelize = sequelize;

// db.auth = require('../models/auth')(sequelize, Sequelize);
// db.order = require('../models/order')(sequelize, Sequelize);
// db.order_product = require('../models/order_product')(sequelize, Sequelize);
// db.payment = require('../models/payment')(sequelize, Sequelize);
// db.product = require('../models/product')(sequelize, Sequelize); tira error
// db.status = require('../models/status')(sequelize, Sequelize);
// db.user = require('../models/user')(sequelize, Sequelize);//tira error

// db.auth.belongsTo(db.user); tira error
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
