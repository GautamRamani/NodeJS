const express=require("express")
require("./Db/connections")   
const Student=require("./Model/schema") 
const app=express();
app.use(express.json());

const LoginModule=require("./Login/login")
const indexRouter = require('./routes/index');
app.use("/login",LoginModule);
app.use('/user', indexRouter);

const port=process.env.port||5566;
app.listen(port,()=>{
    console.log(`server listening the port number ${port}`)
});
