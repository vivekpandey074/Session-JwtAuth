
// SESSION BASED AUTHENTCATION BELOW

// const sessionIdToUserMap=new Map();


// function setUser(sessionId,user){
//    sessionIdToUserMap.set(sessionId,user);
// }


// function getUser(sessionId){
//   return sessionIdToUserMap.get(sessionId);
// }


// module.exports={
//     setUser,
//     getUser,
// }


// JWT BASED AUTHENCATION BELOW:


const jwt=require("jsonwebtoken");

const secretKey="VivekPandey@123";

function setUser(user){
    //this will return JSON Web Token created with above secretKey
   return jwt.sign({
    _id:user._id,
    email:user.email
   },secretKey);
}


function getUser(token){
   if(!token) return null;
    //this will return the payload else return error

    try{
        return jwt.verify(token,secretKey);

    }catch(e){

        //returing null so that  middleware get indication that jwt has not veryfied 
       return null;
    }
  
}


module.exports={
    setUser,
    getUser,
}







