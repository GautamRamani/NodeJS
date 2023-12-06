const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSingUp = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});
userSingUp.plugin(mongoosePaginate);
let User = mongoose.model('User', userSingUp);

module.exports = User;