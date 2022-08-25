const jwt = require("jsonwebtoken");
const { application } = require("express");

const jwtsecret = "myjwtsecret";

const verifyjwt = (req,res,next)=>{
    const token = req.headers["token"];

    if(!token){
        res.json({
            status:"Failed",
            message:"you have no token",
            auth:false
        })
    }else{
        jwt.verify(token,jwtsecret,(err,decoded)=>{
            if(err){
                res.json({
                    status:"failed",
                    message:"wrong token",
                    auth:false
                })
            }else{
                req.userid = decoded.id;
                console.log(req.userid);
                next();
            }
        })
    }
}