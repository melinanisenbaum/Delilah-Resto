const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('../config/database.js');
const config = require('../config/config.js');
const { QueryTypes } = require("sequelize");
const { limiter } = require('../utils/utils.js');


//TIRA ERROR EL POSTMAN CON UN GET TAMBIEN
// router.get('/', (req, res) => {
//     res.json({message: "Hello"});
//   });

router.post('/', limiter, async (req, res) => {
    
    const {username, passwd} = req.body;
    
    const getUsername = await db.query(
        'SELECT * FROM users WHERE username = :username OR email = :username',
        {
            replacements: {
              username,
            },
            type: QueryTypes.SELECT,
        }
    ).catch((err) => {
        console.log('Error: ', err)
    });

    if(!getUsername) {
        return res.json({ message: 'Username or password does not match!'})
    }

    if(getUsername.passwd !== passwd) {
        return res.json({ message: 'Username or password does not match!'})
    }

    const jwtToken = jwt.sign({id: getUsername.id, email: getUsername.email, admin: false }, process.env.TOKENSECRET);

    res.json({ message: 'Welcome back!', token: jwtToken });

});

module.exports = router