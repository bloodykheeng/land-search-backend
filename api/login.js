const cookieparser = require("cookie-parser");
const uuid = require("uuid");
const dbcon = require("../connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { application } = require("express");

const jwtsecret = "myjwtsecret"

exports.login = (req,res)=>{
    let {username ,password} = req.body;
    username = username.trim();
    password = password.trim();

    if(username == "" || password == ""){
        res.json({
            status:"FAILED",
            message:"empty credentials",
            auth:false
        })
    }else{
        let query = "select * from adminusers where username = ?";
        dbcon.query(query,[username],(err,data)=>{
            if(err){
                res.json({
                    status:"FAILED",
                    message:"failed to query database"
                })
            }
            if(data.length < 1){
                res.json({
                    status:"FAILED",
                    message:"user doesnot exist",
                    auth:false
                })
            }else{
               
                const hashedPassword = data[0].password;
                bcrypt.compare(password,hashedPassword)
                .then((result)=>{
                    if(!result){
                        res.json({
                            status:"FAILED",
                            message:"invalid password",
                            auth:false
                        })
                    }else{
                        let now = new Date();
                        let time = now.getTime();
                        time += 3600 * 1000;
                        now.setTime(time);

                         const id = data[0].adminId;
                         const token = jwt.sign({id},jwtsecret,{expiresIn:'1h'});
                         res.cookie("token",token,
                         {
                        httpOnly:true,
                        maxAge:1000000
                        });
                        res.json({
                                    status:"SUCESSFULL",
                                    message:"signed in sucessfully",
                                    token:token,
                                    auth:true,
                                    data: data
                                })
                    }
                })
                .catch((err)=>{
                    res.json({
                        status:"FAILED",
                        message:"an error occured while comparing passwords " + err.message
                    })
                })
            }
        })
    } 
}

