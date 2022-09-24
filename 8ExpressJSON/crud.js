const express = require("express");
require("./db/connections");
const Student = require("./model/Schema");

const app = express();
app.use(express.json())

//get student
app.get("/api", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get students by id
app.get("/api/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    const studentData = await Student.findById(_id);
    if (!studentData) {
      res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//insert student
app.post("/api", async (req, res) => {
  try {
    const user = new Student(req.body);
    console.log(user)
    const creatUser = await user.save();
    res.status(201).send(creatUser);
  } catch (e) {
    res.status(400).send(e);
  }
});



//update the students by it id(new version)
app.patch("/api/:id", async (req, res) => {
  try {
    const UapdateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.send(UapdateStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});
// put :-
//  put also update the data (old version) 
// in above code app.put remaining content same

app.put("/api/:id", async (req, res) => {
  try {
    const UapdateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.send(UapdateStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete
app.delete("/api/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

const port=process.env.port||8080;
app.listen(port,()=>{
  console.log(`server listening the port number ${port}`)
})