const mongoose=require("mongoose")

// local 
mongoose.connect("mongodb://localhost:27017/restapi")
        .then(()=>{console.log("Connections Success...")})
        .catch((e)=>{console.log(e)})

// cloud
// const dburl="mongodb+srv://admin:admin@cluster0.pk2l5qk.mongodb.net/restapi?retryWrites=true&w=majority";

// const connectionsParams={
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
// }

// mongoose.connect(dburl,connectionsParams)
//         .then(()=>console.log("Connection Success"))
//         .catch((e)=>{console.log(e)})