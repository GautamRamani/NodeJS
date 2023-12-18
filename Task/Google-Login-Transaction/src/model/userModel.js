const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: {
        type: String,
        // enum: ['Buyer', 'Seller']
    },
    wallet: { type: Number },
    token: { type: String },
    profilePicture: { type: String },
    date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = { User }