const http=require('http')
const fs=require('fs')
const url=require('url')
var server=http.createServer((request,response)=>{
    fs.writeFileSync('demo.txt','<h1>Positive vibes</h1>')
    fs.appendFileSync('demo.txt','<h1>\nAll glory comes from daring to begin !!</h1>')
    fs.writeFileSync('new.txt','')
    const result=fs.readFileSync('demo.txt','utf-8')
    fs.appendFileSync('new.txt',result)
    fs.unlink('demo.txt',(err)=>{
        if(err) throw err;
        else{
            console.log('file delete successfully')
        }
    })
    response.write(result.toString());
    console.log('request rec...')
    const q=url.parse(request.url,true).query;
    if(q.username=='skillqode'&&q.password=='1234'){
        response.write('<h1>Login Successfully</h1>')
    }
    else{
        response.write('<h1>Login Fail</h1>')
    }
    response.end();
}) 
server.listen(9090,()=>{
    console.log('listening 9090')
})