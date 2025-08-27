const express=require("express");
const{connectToMongodb}=require("./connect/connect");
const urlRoute=require("./routes/route");
const path=require("path");
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose");
require("dotenv").config();
const port=process.env.PORT;





const URL=require("./model/urlSchema");


const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.set("view engine","ejs");
app.set("views",path.resolve("view"))
app.use(express.json());
app.use(cookieParser());
connectToMongodb(process.env.MONGODB_URL);

app.use("/url",urlRoute); 
app.get("/",(req,res)=>{
    res.render("home");
})

 






app.listen(port,()=>{console.log(`Server is started at port:${port}`)})