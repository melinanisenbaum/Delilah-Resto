const passport = require('passport');
const passportJwt = require('passport-jwt');
const user = require('../models/user');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const USer = require('../models/user');

//validation del jwt

passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            secretOrKey: process.env.TOKENSECRET,
        },
        function (jwtPayload, done) {
            return user.findOne({ where: { id: jwtPayload.id } })
            .then((user) => {
                return done(null, user);
            })
            .catch((err) => {
            return done(err);
            });
        }
    )
);
