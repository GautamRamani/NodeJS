const jwt = require("jsonwebtoken")
const authenticateUser = (req, res, next) => {
    const userId = 786;
    const secretKey = process.env.SECRET_KEY
    console.log("secretKey::", secretKey);
    const token = jwt.sign({ userId: userId }, secretKey, {
        expiresIn: 24 * 60 * 60
    })
    req.session.jwtToken = token
    next();
}

module.exports = authenticateUser;