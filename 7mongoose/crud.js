// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:27017/newskill")
//   .then(() => console.log("sucsess"))
//   .catch((err) => console.log(err));

// const prSchema = new mongoose.Schema({
//   sno: Number,
//   sname: String,
//   fees: Number,
//   course: String, 
// });

// const Playlist = new mongoose.model("studs", prSchema);

//find
// const getDocument=async ()=>{
  //       const result=await Playlist.find({}).then((err,data)=>{console.log(err)});
  // };
  // getDocument();

  // db.studs.insertOne({sno:111,sname:"Ram",fees:37500,course:"Node"})
// db.studs.insertOne({sno:112,sname:"Raj",fees:45000,course:"FullStack"})
// db.studs.insertOne({sno:113,sname:"a",fees:65000,course:"Django"})
// db.studs.insertOne({sno:114,sname:"b",fees:45000,course:"Node"})
// db.studs.insertOne({sno:115,sname:"c",fees:65000,course:"Flutter"})
// db.studs.insertOne({sno:116,sname:"d",fees:25000,course:"Python"})

// two ways create collection:-
// a) collectionname (ex:stud) if when we run the code it makes new collection studs. so insert the data in studs after run the code
// b)  if collectionname already in such  manner (ex:studs) so, it show the collection directly

//insert
// var newStud = new Playlist({
//   sno: 121,
//   sname: "Rohandas",
//   fees: 110000,
//   course: "Python Django",
// });

// newStud.save(afterDataInserted);
// function afterDataInserted(error) {
//   if (error == null) {
//     console.log("Inserted");
//   } else {
//     console.log(error);
//   }
//   mongoose.disconnect();
// }

//update
// const updateDocument = async(_id) =>{
//   try{
//       const result =await Playlist.findByIdAndUpdate({_id},{
//           $set:{
//               sname:"javascript"
//           }
//       },{
//           new:true,
//           useFindAndModify:false
//       });
//       console.log(result)
//   }catch(err){
//       console.log(err)
//   }
// }
// updateDocument("62d7e222c7f373c372f78a00");
                    //or
//update
// const updating= Playlist.findOne({
//     sno: 121,
// });
// const update={fees:55000}
// updating.updateOne(update,afterupdate)
// function afterupdate(error){
//     if(error==null){
//         console.log("Updated Successfully")
//     }else{
//         console.log(error)
//     }
// }

//delete
// const deleteDocument = async(_id) =>{
//   try{
//       const result =await Playlist.findByIdAndDelete({_id})
//       console.log(result)
//   }
// catch(err){
//   console.log(err)
// }
// }
// deleteDocument("62d7e222c7f373c372f78a00")