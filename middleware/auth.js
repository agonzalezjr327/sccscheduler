const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        ///// Verify Token /////////
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //// Add User From Payload ////
        req.user = decoded
        next();

    } catch(err) {
        
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;
