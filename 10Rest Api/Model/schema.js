const mongoose=require("mongoose")

const Studentschema=new mongoose.Schema({
    name:String,
    rollno:Number,
    marks:Number
});

const Student=new mongoose.model("datas",Studentschema);

module.exports=Student;