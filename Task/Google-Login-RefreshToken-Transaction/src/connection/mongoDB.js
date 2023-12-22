const mongoose = require("mongoose")

async function mongoInit() {
    try {
        const connectionString = 'mongodb://127.0.0.1:27017/books';
        await mongoose.connect(connectionString, { useNewUrlParser: true });
        console.log("MongoDB Connect successfully");
    } catch (error) {
        console.log(error);
    }
}
module.exports = { mongoInit }