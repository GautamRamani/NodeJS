const express = require("express");
const ejs = require("ejs");
var app = express();

app.listen(5151, () => {
  console.log("Sever started at port no. 5151");
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  var model = { x: 1000, y: 20 };
  res.render("index", model);
});
app.get("/login", (req, res) => {
  var model = { uname: "qode", upwd: "qode@123" };
  res.render("login", model);
});

app.get("/student", (req, res) => {
  var model = {
    studentId: "S011",
    studentName: "Ramesh",
    studentMarks: 40,
    subjects: [
      { name: "math", marks: "54" },
      { name: "science", marks: "53" },
      { name: "english", marks: "35" },
    ],
  };
  // var model = {
  //     studentId: 'S011', studentName: 'Ramesh', studentMarks: "46"
  // }
  res.render("student", model);
});