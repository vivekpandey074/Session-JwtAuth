const { getUser } = require("../service/auth");


 function checkAuthentication(req,res,next){
   
   // const authorizationHeaderValue=req.headers["authorization"];
   const tokenCookie=req.cookies?.token;
 console.log("Inside CheckAuth");
   
   req.user=null;
    
   // if(!tokenCookie) return next();
    
   
   const token=tokenCookie;
   const user=getUser(token);
  console.log("User:-->",user);
   req.user=user;

   return next();

}


function restrictTo(roles=[]){
   return function(req,res,next){
      console.log("Inside RestrictTo")
      if(!req.user) { console.log("Rendering Login Page (Now on Longin Page)"); return res.redirect("/login");}

      if(!roles.includes(req.user.role)){
         return res.end("UnAuthorized");
      }
    console.log("Inside RestrictTo: U are allowed :)");
      return next();
   }
}



// async function restrictToLoggedInUserOnly(req,res,next){
//    // const userId=req.cookies?.uid;
   
//    const userId=req.headers["authorization"];
//    console.log(req.headers)

//    if(!userId) return res.redirect("/login");
    
//    const token=userId?.split("Bearer ")[1];
//    const user=getUser(token);

//    if(!user)  return res.redirect("/login")

//    req.user=user;

//    next();
// }



module.exports={
    checkAuthentication,
    restrictTo
}