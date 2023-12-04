const express = require('express');
const morgan = require('morgan');
const session = require('express-session')
const router = require("./auth/authController")
require('dotenv').config()

const port = 8000;

const app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(morgan("tiny"))

app.get("/test", (req, res) => {
    res.status(200).send("Health::")
})

app.use("/", router)

app.listen(port, () => {
    console.log(`http server listening on ${port}`);
})