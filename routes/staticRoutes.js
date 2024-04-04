const express=require("express");
const router=express.Router();
const URL=require("../models/urls");
const { restrictTo } = require("../middlewares/auth");

router.get("/admin/url",restrictTo(["ADMIN"]),async (req,res)=>{
  //  if(!req.user) return res.redirect("/login");
   const allUrls=await URL.find({});
   
   return res.render("home",{
     urls:allUrls
   })
})


router.get("/",restrictTo(["NORMAL","ADMIN"]),async (req,res)=>{
  //  if(!req.user) return res.redirect("/login");
   const allUrls=await URL.find({createdBy:req.user._id});
   
   return res.render("home",{
     urls:allUrls
   })
})



router.get("/login",async (req,res)=>{
  return res.render("login");
})

router.get("/signup",async(req,res)=>{
  return res.render("signup");
})

module.exports=router

