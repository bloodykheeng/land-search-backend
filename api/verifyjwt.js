const jwt = require("jsonwebtoken");
const { application } = require("express");

const jwtsecret = "myjwtsecret";

const verifyjwt = (req,res,next)=>{
    const token = req.cookies["cookie-token"];
   
    if(!token){
        res.json({
            status:"cookie-failed",
            message:"you have no cookie token",
            auth:false
        })
    }else{
        jwt.verify(token,jwtsecret,(err,decoded)=>{
            if(err){
                res.json({
                    status:"token-failed",
                    message:"wrong token",
                    auth:false
                })
               
            }else{
                req.admindata = decoded;
                next();
            }
        })
    }
}

module.exports = verifyjwt;