import mongoose from "mongoose";

const userSingUp = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
})

let User = mongoose.model('User', userSingUp)

export default User;