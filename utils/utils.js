const moment = require('moment');
const time = moment();
    ///const timestamp = {};
const rateLimit = require('express-rate-limit');//seguridad    
const { db } = require('../config/database');
const { QueryTypes } = require ('sequelize');
const jwt = require('jsonwebtoken');


        //timestamp.time = (timestamp) => {
        //return time.format('LT');
        //},


function authToken (req, res, next) {
    if (req.path !== '/login' && req.path !== '/register') {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.TOKENSECRET, (err, decoded) => {
                if (err) {
                   return res.status(403).send({ message: 'Unauthorized request!' });
                }
                next();
            });
        } else { return res.status(403).send({ message: 'Access denied!' }) }
    } else {
        next();
    }
}

function limiter(req, res, next) {
    rateLimit(
        {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        }
    );
    next()
}

function createAccountLimiter (req, res, next) {
    rateLimit(
        {
            windowMs: 60 * 60 * 1000, // 1 hour window
            max: 5, // start blocking after 5 requests
            message:
                "Too many accounts created from this IP, please try again after an hour"
        }
    );
    next()
}
    
function authRole(role) {
    return (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.TOKENSECRET, function(err, decoded){
            if(err) {
                return res.status(403).send({ message: 'Action forbidden', err })
            };
            if (decoded.role !== role) {
                return res.status(403).send({ message: 'Action not allowed', err })
            }
            if (decoded.role === role) {
                next();
            }
        })
    }
}

function authUser() {
    return (req, res, next) => {
        const id = +req.params.userId;
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.TOKENSECRET, function(err, decoded){
            if(err) {
                return res.status(403).send({ message: 'Action forbidden', err })
            };
            if (decoded.role !== 1  && decoded.id !== id ) {
                return res.status(403).send({ message: 'Unauthorized request', err })
            }
            if (decoded.role === 1 || decoded.id === id) {
                next();
            }
        })
    }
}

async function findUser(userId) {
    const getUser = await db.query(
        `SELECT * FROM users WHERE userId = :userId`, 
        {
            replacements: { userId },
            type: QueryTypes.SELECT
        }
    );
    const user = {
        id: getUser[0].userId,
        username: getUser[0].username,
        fullname: getUser[0].fullname,
        email: getUser[0].email,
        phone: getUser[0].phone,
        address: getUser[0].address,
        isAdmin: getUser[0].isAdmin,
    };
    return user;
}

async function findProduct(productId) {
    const getProduct = await db.query(
        `SELECT * FROM products WHERE productId = :productId`, 
        {
            replacements: { productId },
            type: QueryTypes.SELECT
        }
    );
    const product = {
        productId: getProduct[0].productId,
        pname: getProduct[0].pname,
        imgURL: getProduct[0].imgURL,
        price: getProduct[0].price,
    };
    return product;
}

async function totalPrice(op_quantity, productId) {
    const promise = await findProduct(productId);
    const productPrice = +promise.price;
    const total = +(op_quantity * productPrice);
    return total;
}

async function findOrder(orderId) {
    const getOrder = await db.query(
        `SELECT * FROM orders WHERE orderId = :orderId`,
        {
          replacements: { orderId },
          type: QueryTypes.SELECT
        }
      );
      const order = {
        orderId: getOrder[0].orderId,
        stat_id: getOrder[0].stat_id,
        paym_id: getOrder[0].paym_id,
        userID: getOrder[0].userId,
        order_datetime: getOrder[0].order_datetime
    };
    return order;
}

module.exports = { 
    authToken, 
    limiter, 
    rateLimit, 
    createAccountLimiter, 
    authRole, 
    authUser, 
    findUser, 
    findProduct, 
    totalPrice, 
    findOrder
}