if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const { Router } = require('express');
const config = require('../config/config.js');
const { db } = require('../config/database');
const { limiter } = require('../utils/utils.js');
const router = Router();
const jwt = require('jsonwebtoken');

const users = db.query('SELECT * users FROM delilahResto');
const tokenSecret = config.TOKENSECRET;

const validateUser = (req, res, next) => {
    if(users.some(user => user.username === req.body.username && user.password === req.body.password))
        next()
    else
        res.status(401).send('Usuario y/o contraseña inválidos');
};

router.post('/', validateUser, limiter, (req, res) => {//no funciona
    const token = jwt.sign({username, admin: false }, tokenSecret);
    res.status(200),
    res.json({token});
});
