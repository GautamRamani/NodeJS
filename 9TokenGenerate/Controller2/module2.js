const express = require("express");

const module2 = express.Router();

module2.get("/", require("../MiddleLayer/middleware"), (req, res) => {
    res.json({ msg: "Welcome to Module 2 using middleware..." });
  });
module.exports = module2;