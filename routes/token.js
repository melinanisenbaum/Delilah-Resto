const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/utils.js');

router.post('/', async (req, res) => {
    const refreshToken = req.body.token;
    let refreshTokens = [];

    if (refreshToken == null) {
        return res.sendStatus(401);
    }

    if (refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKENSECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = generateAccessToken({ id, email });
        res.json({ accessToken: accessToken})
    });
});

module.exports = router
