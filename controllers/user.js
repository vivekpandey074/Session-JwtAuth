const { User } = require("../models/user");
const {v4:uuidv4}=require("uuid");
const { setUser } = require("../service/auth");


async function handleUserLogin(req,res){
 const {email,password}=req.body;
 const user=await User.findOne({email,password});
 if(!user){
    return res.render("login",{
        error:"Invalid Id and password",
    })
 } 

 //Session Based auth
//  const sessionId=uuidv4();
//  setUser(sessionId,user) //  storing user against sessionId in Map

// res.cookie("uid",sessionId)
//  return res.redirect("/")


//JWT based auth
 const token=setUser(user);
res.cookie("uid",token)
 return res.redirect("/")
}


async function handleUserSignUp(req,res){
   const {name,email,password}=req.body;
   await User.create({
      name,
      email,
      password,
   })

   
   return res.redirect("/");
}


module.exports={
    handleUserLogin,
    handleUserSignUp
}