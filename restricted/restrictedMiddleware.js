
const jwt = require('jsonwebtoken');
const secrets = require('./secrets');
const Users = require('../db-helpers/users-dbmodel');


module.exports = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (tokenHeader) {
        tokenStrings = tokenHeader.split(" ");
        console.log(tokenStrings);
        if (tokenStrings[0].toUpperCase() === 'BEARER' && tokenStrings[2]) {
            jwt.verify(tokenStrings[2], secrets.jwtSecret, (err, decodedToken) => {
                if (err) {
                    //bad token
                    res.status(401).json({ message: 'error verifying token', error: err });
                } else {
                    //token ok 
                    req.decodedJwt = decodedToken;
                    next();
                }
            });
        } else {
            res.status(401).json({ message: "invalid scheme, or no token after scheme name." });
        }
    } else {
        res.status(401).json({ message: 'missing Authorization header' });
    }
};