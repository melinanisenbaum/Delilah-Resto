const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('../config/database.js');
const { QueryTypes } = require('sequelize');
const { limiter, generateAccessToken, generateRefreshToken, getUserId } = require('../utils/utils.js');

router.post('/', limiter, async (req, res) => {
    
    const { username, passwd } = req.body;

    const getUser = await db.query(
        `SELECT * FROM users WHERE username = :username OR email = :username`,
        {
            replacements: { username },
            type: QueryTypes.SELECT
        }
    );
    
    const id = getUser[0].userId;

    const auth_pass = await db.query(
        `SELECT * FROM auths WHERE userId = :id`, 
        {
            replacements: { id },
            type: QueryTypes.SELECT
        }
    );

    const hash = auth_pass[0].auth_pass;
    
    const result = bcrypt.compareSync(passwd, hash);
        
    if( getUser.length === 0 ) {
        res.status(400).send({ error: 'Username or password does not match!' }).end();
        console.log('mal usuario')
    }

    if ( getUser.length > 0 && !result) {
        return res.status(400).send({ error: 'Username or password does not match!' }).end();
    }

    else {

        const user = {
            id: getUser[0].userId,
            email: getUser[0].email,
            role: getUser[0].isAdmin
        }
        const accessToken = jwt.sign(user, process.env.TOKENSECRET);//, {expiresIn: '30m'});
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKENSECRET);
        res.status(200);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
});

module.exports = router