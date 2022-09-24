const express = require("express"); 
const LoginModule=require("./Login/login"); 
const Module1 = require("./COntroller1/module1"); 
const Module2 = require("./Controller2/module2"); 
const Module3 = require("./Controller3/module3"); 
 
const app=express(); 
app.use(express.json()); 

app.use("/login",LoginModule); 
app.use("/module1",Module1); 
app.use("/module2",Module2); 
app.use("/module3",Module3); 
 
 let port=7878;
app.listen(port,()=>{ 
    console.log(`server listening the port number ${port}`); 
});