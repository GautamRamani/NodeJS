const mongoose=require("mongoose")

const Preschema=new mongoose.Schema({
    sname:String,
    Enrollment:Number,
    College:String,
    Field:String
})

const Student=new mongoose.model("records",Preschema)

module.exports=Student;