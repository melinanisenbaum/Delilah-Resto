const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
        authId: {
            field: "auth_id",
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        password: {
            field: "auth_password",
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    msg: "Password is required",
                },
            },
        },
        createAt: {
            field: 'auth_date',
            type: DataTypes.DATE,
            defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    },
    {
      underscored: true,
    },
    {
        timestamps: false
    });

    Auth.prototype.generateHash = function (password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
    };
    Auth.prototype.validPassword = function (password, hash) {
        return bcrypt.compareSync(password, hash);
    };
    return Auth;
};