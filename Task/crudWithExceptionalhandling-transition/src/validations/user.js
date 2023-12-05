const Joi = require("joi")

async function user_signup(data, res) {
    const otpSchema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });
    const { error, value } = otpSchema.validate(data);

    return { error, value }
}

async function validate_login(data, res) {
    const otpSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });
    const { error, value } = otpSchema.validate(data);
    
    return { error, value }
}

module.exports = { user_signup, validate_login }