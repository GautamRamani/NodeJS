const express=require("express")
const router=express.Router();
const Student=require("../Model/schema")

router.get("/",require("../Middleware/middlelayer"),async (req,res)=>{
    try{
        const getuser=await Student.find();
        res.status(200).send(getuser)
    }catch(e){
        res.status(400).send(e);
    }
})

router.post("/",require("../Middleware/middlelayer"),async (req,res)=>{
    try{
        const newuser=new Student(req.body);
        console.log(newuser);
        const createuser=await newuser.save();
        res.status(201).send(createuser)
    }catch(e){
        res.status(400).send(e);
    }
})

router.put("/:id",require("../Middleware/middlelayer"),async (req,res)=>{
    try{
        const updateStud=await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }  
        );
        res.send(updateStud)
    }catch(e){
        res.status(400).send(e);
    }
})

router.delete("/:id",require("../Middleware/middlelayer"),async (req,res)=>{
    try{
        const deletestud=await Student.findByIdAndDelete(req.params.id)
        if(req.params.id){
            res.status(400).send();
        }
        res.send(deletestud);
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports=router;