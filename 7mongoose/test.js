const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/book")
        .then(()=>console.log("Success"))
        .catch((err)=>console.log(err))

const prSchema=new mongoose.Schema({
    title:String,
    isbn:Number,
    downloadable:Boolean,
    no_of_reviews:Number,
    tags:Array,
    languages:Array,
    author:{
        name:String,
        callname:String,
            profile:{
            exp:Number,
            courses:Number,
            books:Number
        }
    }
});

const load=new mongoose.model("authors",prSchema)

//find
const getDocument=async()=>{
    const result=await load.find({}).then((err,data)=>console.log(err))
}
getDocument();

//insert
// const newinsert=load({
//     "title" : "All glory comes from daring to begin",
//         "isbn" : 1264,
//         "downloadable" : true,
//         "no_of_reviews" : 5,
//         "tags" : [
//                 "Cricket"
//         ],
//         "languages" : [
//                 "english",
//                 "hindi",
//                 "tamil"
//         ],
//         "author" : {
//                 "name" : "Gautam Gambhir",
//                 "callname" : "Gambhir",
//                 "profile" : {
//                         "exp" : 8,
//                         "courses" : 3,
//                         "books" : 2
//                 }
//         }
// })
// newinsert.save(afterinserted)
// function afterinserted(error){
//     if(error==null){
//         console.log("Inserted")
//     }
//     else{
//         console.log(error)
//     }
//     mongoose.disconnect();
// }

//update
// const updateDocument=async(_id)=>{
//     try{
//         const update=await load.findByIdAndUpdate({_id},{
//             $set:{
//                     isbn:7878,
//                     no_of_reviews:6
//             }
//         },{
//             new:true,
//             useFindAndModify:false
//         });
//         console.log(update)
//     }catch(err){
//         console.log(err)
//     }
// }
// updateDocument("62d8ef1909ab66fec1bdb003")
                        //  or
//update
// const updating= load.findOne({
//     isbn:1264,
// });
// const update={title:'there is no comparission between son and moon'}
// updating.updateOne(update,afterupdate)
// function afterupdate(error){
//     if(error==null){
//         console.log("Updated Successfully")
//     }else{
//         console.log(error)
//     }
// }

//delete
// const deleteDocument=async(_id)=>{
//     try{
//         const remove=await load.findByIdAndDelete({_id})
//         console.log(remove)
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// deleteDocument("62da161eab7b1509f2973576")