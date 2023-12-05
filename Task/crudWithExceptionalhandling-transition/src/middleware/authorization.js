const Jwt = require('jsonwebtoken');
const User = require('../model/user');

async function authMiddleware(req, res, next) {
    try {
        const authHeaders = req.headers.authorization;
        const secret = process.env.SECRET;

        const data = Jwt.verify(authHeaders, secret);

        let user = await User.findOne({ _id: data.id });

        if (!user) {
            throw new Error('token has been expired');
        }
        req.user = user;
        next();
        return true;
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { authMiddleware };