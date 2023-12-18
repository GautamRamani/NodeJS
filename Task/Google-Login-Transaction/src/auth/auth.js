const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
async function auth(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) {
            next(new Error("Please add token"))
        }
        let decode = jwt.verify(token, "SECRET")
        let user = await User.findOne({ _id: decode.id })
        if (user) {
            req.user = user;
            next()
        } else {
            next(new Error("Invalid user"))
        }
    } catch (error) {
        console.log(error);
        next(new Error("Auth Fail"))
    }
}
module.exports = { auth }