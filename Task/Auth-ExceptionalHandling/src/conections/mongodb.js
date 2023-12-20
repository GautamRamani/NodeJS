const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

async function init() {
    try {
        let url;

        if (process.env.NODE_ENV == 'dev') {
            url = process.env.MONGO_URI
        } else if (process.env.NODE_ENV == 'prod') {
            url = process.env.MONGO_URI
        } else {
            url = process.env.MONGO_URI
        }
        console.log(url);

        let client= await mongoose.connect(`${url}`, {
            useUnifiedTopology: true
        })

        console.log("MongoDB initialized");
        return client;

    } catch (error) {
        console.log("Error connecting to database::");
    }
}

module.exports = { init };