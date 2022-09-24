const express=require("express")
const router=express.Router();

router.use("/",require("../Controller/users"))

module.exports=router;