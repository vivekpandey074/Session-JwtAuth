const express=require("express");
const app=express();
const path=require("path");
const {connectToMongoDb}=require("./Connections");
const urlRouter=require("./routes/url");
const staticRouter=require("./routes/staticRoutes")
const userRouter=require("./routes/user")

const cookieParser=require("cookie-parser");
const { checkAuthentication,restrictTo } = require("./middlewares/auth");

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
app.use(checkAuthentication);

//Routes
app.use("/",staticRouter);
app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRouter);
app.use("/user",userRouter);


//Server
app.listen(Port,()=>{
    console.log("Server Started Succesfully!!");
})



//                                                                                                 redirecting to login                                                                                                                                         (we are on our path to reach "/"(home)) but bodygaurd restrictTo(middleware) want to check our authorization           
// client----> checkAuthentication(middlware)---->(req.user==null)------>restrictTo(middleware)--------------------------------------> 1.LoginScreen Page--------------->From Login Page we will be  -------------------------> CheckAuthencation will give -------------------------------------------------------------------------------------------------------------------------->Once authroizaed, we will acces home page, other url can only be access if autorized 
//            (Initially, we are not loggedin)                       (No user, go login first)                                       2.Post request on user/login       redirected to "/"(Home) but                            User after validating token
//                                                                                                                                   3.Got the token                    but checkAuthentication middleware will come

