const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', 
        {
            userId: {
                field: 'user_id',
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                field: 'user_username',
                type: DataTypes.STRING(16),
                validate: {
                    notEmpty: {
                        msg: 'Username required',
                    },
                },         
                unique: {
                    args: true,
                    msg: 'This user already exists',
                },
            },
            fullname: {
                field:'fullname',
                type: DataTypes.STRING(60),
                validate: {
                    notEmpty: {
                        msg: 'Fullname is required'
                    },
                },
            },
            email: {
                field: 'email',
                type: DataTypes.STRING(60),
                validate: {
                    isEmail: {
                        msg: 'email is Invalid'
                    },
                },
                unique: {
                    args: true,
                    msg: 'This email already exists',
                },
            },
            phone: {
                field: 'phone_number',
                type: DataTypes.STRING(12),
                validate: {
                    notEmpty: {
                        msg: 'Phone number is required'
                    },
                },
            },
            address: {
                field: "address",
                type: DataTypes.STRING(60),
                validate: {
                    notEmpty: {
                        msg: "Address is required",
                    },
                },
            },
            admin: {
                field: "user_admin",
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            createdAt: {
                field: "user_created_at",
                type: DataTypes.DATE,
                defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
            },
        },
        {
            underscored: true
        },   
        {
            timestamps: false
        }
    );
    return User;
};