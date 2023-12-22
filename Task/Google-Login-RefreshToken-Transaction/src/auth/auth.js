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

async function refreshToken(req, res, next) {
    try {

        const refreshToken = req.headers['new-refresh-token'];

        if (!refreshToken) {
            next(new Error("Please add refresh token"));
        }

        let decodeRefreshToken = jwt.verify(refreshToken, "REFRESH_SECRET");

        let user = await User.findOne({ _id: decodeRefreshToken.id });

        if (user) {
            let newRefreshToken = jwt.sign({ id: user._id }, "REFRESH_SECRET");

            if (refreshToken !== user.refreshToken) {
                next(new Error("Invalid refreshToken"));
            }

            await User.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    refreshToken: newRefreshToken,
                }
            }, { new: true, upsert: true });
            res.header('New-Refresh-Token', newRefreshToken);
            next();
        } else {
            next(new Error("Invalid user"));
        }
    } catch (error) {
        console.log(error);
        next(new Error("Refresh Token Fail"));
    }
}

module.exports = { auth, refreshToken }