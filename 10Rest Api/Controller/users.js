const express = require('express');
const router = express.Router();
const Student=require("../Model/schema")

router.get("/",require("../MiddleLayer/middleware"),async (req,res)=>{
    try{
        const studentData=await Student.find();
        res.status(200).send(studentData)
        }catch(e){
            res.status(400).send(e);
        }
})

router.post("/",require("../MiddleLayer/middleware"),async (req,res)=>{
  try{
      const user=new Student(req.body)
      console.log(user);
      const creatuser=await user.save();
      res.status(201).send(creatuser)
  }catch(e){
      res.status(400).send(e);
  }
})

router.put("/:id",require("../MiddleLayer/middleware"),async (req,res)=>{
  try{
      const UpdateStudent=await Student.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
              new:true,
          }          
      );
      res.send(UpdateStudent)
  }catch(e){  
      res.status(400).send(e)
  }
})

router.delete("/:id",require("../MiddleLayer/middleware"),async (req,res)=>{
  try{
      const deletestudent=await Student.findByIdAndDelete(req.params.id)
      if(req.params.id){
          res.status(400).send()
      }
      res.send(deletestudent)
  }catch(e){
      res.status(400).send(e)
  }
})

module.exports = router; 