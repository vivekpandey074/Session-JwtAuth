const express=require("express");
const app=express();
const path=require("path");
const {connectToMongoDb}=require("./Connections");
const urlRouter=require("./routes/url");
const staticRouter=require("./routes/staticRoutes")
const userRouter=require("./routes/user")

const cookieParser=require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const Port=8001;


//Connecting TO DB
connectToMongoDb("mongodb://localhost:27017/urlShortnerPractice").then(()=>{
    console.log("MONGODB CONNECTED SUCCESFULLY");
}).catch(()=>{
    console.log("Error Occured while Connecting to MongoDb");
})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))  //telling path of our ejs



//Middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/",checkAuth,staticRouter);
app.use("/url",restrictToLoggedInUserOnly,urlRouter);
app.use("/user",userRouter);


//Server
app.listen(Port,()=>{
    console.log("Server Started Succesfully!!");
})





