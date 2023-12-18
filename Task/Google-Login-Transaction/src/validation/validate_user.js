const Joi = require("joi")

async function validate_signup(data) {
    const Schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        type: Joi.string().valid('Buyer', 'Seller').required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

async function validate_login(data) {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

module.exports = { validate_signup, validate_login }