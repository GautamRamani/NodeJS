const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user_signup, validate_login } = require("../validations/user")

async function Health(req, res) {
    try {
        res.status(200).send({ data: 'Health', msg: 'Success' });
    } catch (error) {
        res.status(400).send({ data: {}, msg: 'Error in Health' });
        console.log('Error in Health::', error);
    }
}

async function signUp(req, res, next) {

    const data = req.body;

    const { error, value: payload } = await user_signup(data, res)

    if (error) {
        return res.send(error.details[0].message)
    }

    let user = await User.findOne({ email: payload.email });
    if (!user) {
        let hashPassword = await bcrypt.hash(payload.password, 10);
        user = await User.create({
            name: payload.name,
            email: payload.email,
            password: hashPassword,
        });
        res.status(200).send({ data: {}, success: true, msg: 'user register successfully' });
    } else {
        next(new Error('User is not found'));
    }
}

async function login(req, res, next) {
    const data = req.body;

    const { value: payload, error } = await validate_login(data, res)

    if (error) {
        return res.send(error.details[0].message)
    }

    let isUser = await User.findOne({ email: payload.email });
    if (!isUser) {
        res.status(400).send({ data: 'email does not exist' });
    } else {
        let isPassword = await bcrypt.compare(payload.password, isUser.password);
        if (isPassword) {
            let secret = process.env.SECRET;
            let token = jwt.sign({ id: isUser._id }, secret);

            let user = await User.findOneAndUpdate({ _id: isUser._id }, { $set: { token: token } });

            let data = {
                name: user?.name,
                email: user?.email,
            };

            res.status(200).send({ data: data, success: true, msg: 'user login successfully' });
        } else {
            next(new Error('password does not match'));
        }
    }
}

module.exports = { Health, signUp, login };