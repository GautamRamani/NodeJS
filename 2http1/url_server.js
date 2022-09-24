//import http module
//http module, used to create the http server
// const http = require("http");

//import url module
//url module is the "predefined" module
//url module, used to parse the url's
//http://localhost:8080/?uname=admin&upwd=admin
// const url = require("url");

//create the http server
const http=require("http")
const url = require("url");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  const q = url.parse(req.body, true).query;
  //   console.log(req.url);
  if (q.uname == "admin" && q.upwd == "admin") {
    res.write("<h1>Login Success</h1>");
  } else {
    res.write("<h1>Login Fail</h1>");
  }
  console.log('request rec...') 
  res.end();
});

//assign the port number
server.listen(2349, () => {
  console.log("server listening the port number 2349");
});