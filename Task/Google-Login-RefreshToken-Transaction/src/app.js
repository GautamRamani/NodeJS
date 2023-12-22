const express = require("express")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const { mongoInit } = require("./connection/mongoDB")
const { handler } = require("./handler/errorExeptional")
const { router } = require("./routes/index")
const passport = require("passport");
const session = require("express-session");

require('./config/passportConfig');

const app = express()

mongoInit()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("tiny"))

app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router)
app.use(handler)

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})