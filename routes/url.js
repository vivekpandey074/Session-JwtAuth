const express=require("express");
const { handleCreateShortUrl ,handleAnalytics,handleRedirect} = require("../controllers");


const router=express.Router();

router.post("/",handleCreateShortUrl);
router.get("/:shortId",handleRedirect); 

router.get("/analytics/:shortId",handleAnalytics);

 
module.exports=router
