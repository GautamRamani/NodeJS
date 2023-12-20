import { connect, ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export async function init() {
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

        await connect(`${url}`, {
            useUnifiedTopology: true
        } as ConnectOptions)

        console.log("MongoDB initialized");

    } catch (error) {
        console.log("Error connecting to database::");
    }
}