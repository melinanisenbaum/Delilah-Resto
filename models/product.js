const moment = require('moment');
//const { Sequelize, DataTypes } = require('sequelize/types');
//const { format } = require('sequelize/types/lib/utils');
//const { db } = require('../config/database.js');

module.exports = (Sequelize, DataTypes) => {
    const Product = Sequelize.define('product', {//aca tira error
        productId: {
            field: 'product_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            field: 'product_name',
            type: DataTypes.STRING(45),
            validate: {
                notEmpty: {
                    msg: 'Name required',
                },
            },
        },
        unique: {
            args: true,
            msg: 'Existing product',
        },
        imgURL: {
            field:'product_URL',
            type: DataTypes.TEXT,
        },
        price: {
            field: 'product_price',
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        createdAt: {
            field: 'product_date',
            type: DataTypes.DATE,
            defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    },
        {underscored: true},
        {timestamps: false},
    );
    return Product;
};
