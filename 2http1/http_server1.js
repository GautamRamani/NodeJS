
const http = require("http");

const server = http.createServer((req, res) => {
  //MIME Type
  //communication language between client and server
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Welcome to HTTP Server !!!</h1>");
  res.write("Request URL" + req.url);
  res.write("Request Method" + req.method);
  res.end();
});

server.listen(3900, () => {
    console.log("server listening the port number 3900");
  });