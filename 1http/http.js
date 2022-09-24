// Node js:-
//     Node js is a Javascript runtime built on crome v8 Javascript engine.
//     provide runtime environment
//     Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, and Linux.

//     Node.js also provides a rich library of various JavaScript modules which simplifies the development of web applications using Node.js to a great extent.

//     Node.js = Runtime Environment + JavaScript Library

//     server:-
//                 A server is a computer program or a device that provides a service to another computer program and its user, also known as the client.

//  Single thread:-
//  Node JS Platform doesn’t follow the Multi-Threaded Request/Response Stateless Model. It follows the Single-Threaded with Event Loop Model. Node JS Processing model mainly inspired by JavaScript Event-based model with JavaScript callback mechanism. Because of which Node.js can handle more concurrent client requests with ease. The event loop is the heart of the Node.js processing model as shown below diagram.


// http server

// http is the predefined module
// http module used to create the http server
// no need to download http module by using either "npm" tool or "yarn" tool
// http module is inbuilt module in NodeJS

// extra
// http module:- Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). To include the HTTP module, use the require () method: The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.

// require() is the predefined function, used to import the modules

// extra
// require:- Node.js follows the CommonJS module system, and the builtin require function is the easiest way to include modules that exist in separate files. The basic functionality of require is that it reads a JavaScript file, executes the file, and then proceeds to return the exports object. An example module: So if you run var example = require ...

// *************************Without Routing*****************

// var http = require("http");
// // console.log(http);
// var server = http.createServer((request, response) => {
//   // response.setHeader("Content-type", "text/html");
//   // response.writeHead(200, { "Content-Type": "text/html" });
//   response.write("<h1>Greeting Hello...</h1>");
//   console.log(" request rec.. ");
//   response.end();
// });
// server.listen(2308, () => {
//   console.log("Listning 2308");
// });
// *************************With Routing*****************
// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'}); 
//     var url = req.url;
//     if(url ==='/about') {
//         res.write(' Welcome to about us page'); 
//         res.end(); 
//     }
//     else if(url ==='/contact') {
//         res.write(' Welcome to contact us page'); 
//         res.end(); 
//     }
//     else {
//         res.write('Hello World!'); 
//         res.end(); 
//     }
// }).listen(3000, function() {
//     console.log("server start at port 3000");
// });




// const os = require("os");
// CPU arch
// console.log(os.arch());                         // x64

// // Platform
// console.log(os.platform());                     // win32

// //CPU core Info
// console.log(os.cpus());

// // console.log(os.hostname());
// console.log(os.type());                         // Windows_NT

// //Free memory
// const fm = os.freemem();
// console.log(`${fm / 1024/1024/1024}`);

// //Total memory
// const tm = os.totalmem();
// console.log(`${tm / 1024/1024/1024}`);

// //Home dir
// console.log(os.homedir())                       // C:\Users\HP

// //Uptime
// console.log(os.uptime())  

