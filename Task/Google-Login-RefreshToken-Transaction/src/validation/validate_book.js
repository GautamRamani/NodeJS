const Joi = require("joi")

async function validate_addBook(data) {
    const Schema = Joi.object({
        bookName: Joi.string().min(5).required(),
        price: Joi.number().required(),
        qty: Joi.number().required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

async function validate_updateQty(data) {
    const Schema = Joi.object({
        bookName: Joi.string().min(5).required(),
        qty: Joi.number().required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

async function validate_deleteBook(data) {
    const Schema = Joi.object({
        bookName: Joi.string().min(5).required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

async function validate_buyBook(data) {
    const Schema = Joi.object({
        bookName: Joi.string().min(5).required(),
        qty: Joi.number().required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

module.exports = { validate_addBook, validate_updateQty, validate_deleteBook, validate_buyBook }