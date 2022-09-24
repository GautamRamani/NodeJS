const express = require("express");

const module1 = express.Router();

module1.get("/", require("../MiddleLayer/middleware"), (req, res) => {
  res.json({ msg: "Welcome to Module 1 using middleware..." });
});

module.exports = module1;