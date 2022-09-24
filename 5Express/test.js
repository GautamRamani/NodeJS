const express=require('express')
const app=express();
port=process.env.port||1234;

app.get('/',(req,res)=>{
    res.send('<h1>hello world !!</h1>')
}).listen(port,()=>{
    console.log(`server listening the port number ${port}`)
})