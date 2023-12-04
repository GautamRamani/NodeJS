const express = require('express');
const authenticateUser = require("../middleware/authentication")
const jwt = require("jsonwebtoken")
const router = express.Router();

//authenticate
router.get("/login", authenticateUser, (req, res) => {
    res.status(200).send("Login Successfully")
})

//profile
router.get("/profile", (req, res) => {
    try {
        const token = req.session.jwtToken;
        const secretKey = process.env.SECRET_KEY
        if (token) {
            const decoded = jwt.verify(token, secretKey)
            res.status(200).send(`welcome to your profile with ${decoded.userId} id`)
        } else {
            res.status(404).send({ status: "Failed", msg: "token not found" })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;