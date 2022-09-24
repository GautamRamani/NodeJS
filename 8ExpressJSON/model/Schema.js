const mongoose = require("mongoose");
// const validator = require("validator");

const studentSchema = new mongoose.Schema({
    sno:Number,
    sname:String,
    fees:Number,
    course:String,
});

//we will create a new collection

const Student = new mongoose.model("studs", studentSchema);

module.exports=Student