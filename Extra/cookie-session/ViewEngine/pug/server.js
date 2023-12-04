const express=require("express")
const pug=require("pug")

const app=express();

let port=process.env.port||5152;
app.listen(port,()=>{
    console.log(`server started at port no.${port}`)
})

app.set("view engine","pug")

app.get("/student",(req,res)=>{
    var model={
        studentId:"S0111",
        studentName:"Ram",
        studentMarks:55,
        subjects:[
            {name:"math",marks:54},
            {name:"science",marks:53},
            {name:"english",marks:55}
        ],
    };
    res.render("student",model)
})