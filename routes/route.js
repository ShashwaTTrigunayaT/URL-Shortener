const express=require("express");
const mongoose=require("mongoose");
const URL=require("../model/urlSchema");

const{handleURL,getAnalytics}=require("../controller/urlcontroller")

const router=express.Router();
router.post("/",handleURL);
router.get("/analytics/:shortId",getAnalytics);
router.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
          visitHistory:{
            timestamp:Date.now(),
          }
        }
    })
    
    res.redirect(entry.redirectURL)
})



module.exports=router;