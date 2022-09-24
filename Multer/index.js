const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()
    
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {          
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       
const maxSize = 5 * 1000 * 1000;
// 1 MB = 1,000,000 Bytes (in decimal)
// 1 MB = 1,048,576 Bytes (in binary)
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
           
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
 
}).single("pic");       
  
app.get("/",function(req,res){
    res.render("File_upload_form");
})
    
app.post("/uploadFile",function (req, res, next) {
         
    upload(req,res,function(err) {
  
        if(err) {            
            res.send(err)
        }
        else {            
            res.send("Successfully Image uploaded..!")
        }
    })
})    

let port=3000;
app.listen(port,console.log(`server listening the port number ${port}`));