const moment = require('moment');
const Order_Product = require('./order_product.js')

module.exports = (Sequelize, DataTypes) => {
    const Order = Sequelize.define('Order', {
        orderId: {
            field: 'order_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: {
            field: 'order_createdAt',
            type: DataTypes.DATE,
            defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
            allowNull: false,
        },
    },
    {
        underscored: true,
    },
    {
        timestamps: false
    },
    );
    return Order;
};

//Order.hasMany(Order_Product, {foreingKey: 'orderId', sourceKey: 'id'});
//Order_Product.belongsTo(Order, {foreingKey: 'orderId', sourceKey: 'id'});

