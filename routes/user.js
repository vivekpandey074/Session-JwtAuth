const express=require("express");
const router=express.Router();

const {handleUserLogin,handleUserSignUp}=require("../controllers/user")




router.post("/login",handleUserLogin)
router.post("/signup",handleUserSignUp)


module.exports=router;