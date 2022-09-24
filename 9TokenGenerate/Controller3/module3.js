const express = require("express");

const module3 = express.Router();

module3.get("/", require("../MiddleLayer/middleware"), (req, res) => {
  res.json({ msg: "Welcome to Module 3 using middleware..." });
});
module.exports = module3;