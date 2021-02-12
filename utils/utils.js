const moment = require('moment');
const time = moment();
    ///const timestamp = {};
const rateLimit = require('express-rate-limit');//seguridad    

module.exports = {
        //timestamp.time = (timestamp) => {
        //return time.format('LT');
        //},

    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers.Authorization;
        const payload = jwt.verify(token);
        console.log(payload);
        if(payload) {
            next()
        } else {
            res.status(403).end();
        }
    },

    limiter: () => {rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
        })
    },

    createAccountLimiter: () => {rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 5, // start blocking after 5 requests
        message:
          "Too many accounts created from this IP, please try again after an hour"
        })
    },
    
    filterAdmin: (req, res, next) => {
        const token = req.headers.Authorization;
        const payload = jwt.verify(token);
        console.log(payload);
        if(payload && payload.admin) {
            next()
        } else {
            res.status(401).end();
        }
    }
}
