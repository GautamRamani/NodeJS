const { validate_signup, validate_login } = require("../validation/validate_user")
const passport = require('passport');
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken")

async function health(req, res) {
    try {
        res.send({ status: "success", message: "health working::" })
    } catch (error) {
        res.send(error)
    }
}

async function signUp(req, res) {
    try {
        const data = req.body;
        const { error, value: payload } = await validate_signup(data)
        if (error) {
            return res.send({ status: "error", success: false, message: error.details[0].message })
        } else {
            let user = await User.findOne({ email: payload.email })
            if (!user) {
                let createUser
                if (payload.type === 'Buyer') {
                    createUser = await User.create({
                        name: payload.name,
                        email: payload.email,
                        password: payload.password,
                        type: payload.type,
                        wallet: 10000
                    })
                    return res.status(200).send({ data: createUser, success: true, message: "User has been register succesfully" })
                } else {
                    createUser = await User.create({
                        name: payload.name,
                        email: payload.email,
                        password: payload.password,
                        type: payload.type,
                        wallet: 0
                    })
                    return res.status(200).send({ data: createUser, success: true, message: "User has been register succesfully" })
                }
            } else {
                return res.status(400).send({ status: "error", success: false, message: "User already exist Please Login!!" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const { error, value: payload } = await validate_login(data)
        if (error) {
            return res.send({ status: "error", success: false, message: error.details[0].message })
        } else {
            let user = await User.findOne({ email: payload.email })
            if (user) {
                if (user.password === payload.password) {
                    let accessToken = jwt.sign({ id: user._id }, "SECRET", { expiresIn: '1d' });
                    let refreshToken = jwt.sign({ id: user._id }, "REFRESH_SECRET");

                    await User.findOneAndUpdate({ email: user.email }, {
                        $set: {
                            token: accessToken,
                            refreshToken: refreshToken
                        }
                    }, { new: true, upsert: true })

                    let data = {
                        user: user.name,
                        token: accessToken,
                        refreshToken: refreshToken
                    }

                    res.setHeader('new-refresh-token', refreshToken);

                    return res.status(200).send({ data: data, success: true, message: "User has login succesfully" })
                } else {
                    return res.status(400).send({ status: "error", success: false, message: "password does not match!!" })
                }
            } else {
                return res.status(400).send({ status: "error", success: false, message: "User not found please register!!" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}
async function authGoogle(req, res, next) {
    try {
        passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
    } catch (error) {
        return res.send({ status: "error", error: error });
    }
}

async function authGoogleCallback(req, res, next) {
    passport.authenticate("google", { failureRedirect: "/" }, (err, user) => {
        console.log("Inside passport.authenticate callback");
        if (err) {
            console.error("Error in authentication:", err);
            return next(err);
        }
        if (!user) {
            console.error("Authentication failed. User not found.");
            // Instead of redirecting here, you should return a response or call next()
            return res.status(401).json({ status: "error", message: "Authentication failed. User not found." });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error("Error in req.logIn:", err);
                return next(err);
            }
            console.log("Authentication successful. User:", user);
            // Instead of redirecting here, you should return a response or call next()
            return res.json({ status: "success", user });
        });
    })(req, res, next);
}

module.exports = { health, signUp, login, authGoogle, authGoogleCallback }