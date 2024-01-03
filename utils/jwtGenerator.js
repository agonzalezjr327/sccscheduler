const jwt = require('jsonwebtoken');
require('dotenv').config();//allows the use of .env file

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    // console.log(payload)
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '6hr'})
};

module.exports = jwtGenerator;