const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/university")
        .then(()=>{console.log("Connection Success...")})
        .catch((e)=>{console.log(e)})

