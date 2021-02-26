const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { db } = require('../config/database.js');
const config = require('../config/config.js');
const { limiter } = require('../utils/utils.js');
const users = db.query('SELECT * users FROM delilahResto');
const tokenSecret = config.TOKENSECRET;
//const authController = require('../controllers/auth_controller')
const validateUser = (req, res, next) => {
    if(users.some(user => user.username === req.body.username && user.password === req.body.password))
        next()
    else
        res.status(401).send('Usuario y/o contraseña inválidos');// sacar status y manejarlo con true o false
};

router.post('/', validateUser, limiter, (req, res) => {//no funciona
    const token = jwt.sign({username, admin: false }, tokenSecret);
    res.status(200),
    res.json({token});
});

module.exports = router