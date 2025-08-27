const shortID=require("shortid");
const URL=require("../model/urlSchema");
async function handleURL(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"URL is required"});
    const shortId=shortID();
    await URL.create({
       shortId:shortId,
       redirectURL:body.url,
       visitHistory:[],
    })
    return res.render('home',{id:shortId,port:process.env.PORT,baseurl:process.env.BASE_URL});
}
async function getAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
       TotalClicks:result.visitHistory.length,
       analytics:result.visitHistory 
    })

}
module.exports={
    handleURL,
    getAnalytics,
}