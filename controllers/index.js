const shortid=require("shortid")
const URL=require("../models/urls")

async function handleCreateShortUrl (req,res){
   if(!req.body) return res.status(400).json({error:"Url is required"});

   const nanoID=shortid(8);

  const  result=await URL.create({
    shortUrl:nanoID,
    redirectUrl:req.body.url,
    visitHistory:[],
    createdBy:req.user._id,
   })


   return res.render("home",{
    id:nanoID
});
}


 async function handleRedirect(req,res) {
    const shortUrl=req.params.shortId;
    
    const entry=await URL.findOneAndUpdate({
     shortUrl
    },{
     $push:{
         visitHistory:{
             timestamp:Date.now(),         
         }
     }
    });
     
    res.redirect("https://"+entry.redirectUrl)
    


 }









async function handleAnalytics(req,res){
    const shortUrl=req.params.shortId;
    const result=await URL.findOne({shortUrl})
console.log(result);
    return res.json({totalClicks:result.visitHistory.length,
    analytics:result.visitHistory})
}





module.exports={
    handleCreateShortUrl,
    handleAnalytics,
    handleRedirect
}