//no la utilizo en esta API

const passport = require('passport');
const passportJwt = require('passport-jwt');
const user = require('../models/user');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { db } = require('../config/database');
const { QueryTypes } = require('sequelize');

//validation del jwt

passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKENSECRET,
        },
        async function (jwtPayload, done) {
            const id = jwtPayload.id;
            const findUser = await db.query(
                `SELECT * FROM users WHERE userId = :id`,
                {
                    replacements: { id },
                    type: QueryTypes.SELECT
                }
            );

            return findUser
            .then((findUser) => {
                return done(null, findUser);
            })
            .catch((err) => {
            return done(err);
            });
        }
    )
);
