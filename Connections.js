const mongoose=require("mongoose");

mongoose.set("strictQuery",true);
async function connectToMongoDb(url){
    return await mongoose.connect(url);
}


module.exports={
    connectToMongoDb,
}
