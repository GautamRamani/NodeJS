const User = require('../model/user');
const { profile_validate } = require("../validations/user")

async function user(req, res, next) {
    const data = req.body;

    const { value: payload, error } = await profile_validate(data, res)

    if (error) {
        return res.send(error.details[0].message)
    }

    let user = await User.findOne({ _id: payload.id });
    if (user) {
        let data = {
            name: user.name,
            email: user.email,
        };
        res.status(200).send({ data: data, success: true, msg: 'user profile has been fetched successfully' });
    } else {
        next(new Error('User not found'));
    }
}

async function getUser(req, res, next) {
    const { page, limit } = req.body;

    try {
        let user = await User.find({}).limit(limit * 1).skip((page - 1) * limit);

        let count = await User.countDocuments();

        res.status(200).send({ data: user, totalPages: Math.ceil(count / limit), currentPage: page });

    } catch (error) {
        console.log(error.message);
    }
}

async function getUserV2(req, res, next) {
    const { page, limit } = req.body;
    try {
        let options = {
            page: page || 1,
            limit: limit || 10
        }
        const user = await User.paginate({}, options)
        res.status(200).send({ data: user });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { user, getUser, getUserV2 };