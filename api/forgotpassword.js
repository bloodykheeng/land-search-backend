const cookieparser = require("cookie-parser");
const dbcon = require("../connection.js");

const jwt = require("jsonwebtoken");
const jwtsecret = "myjwtsecret"

exports.fogotpassword = (req,res)=>{
    let {email} = req.body;
    email = email.trim();

    if(email == ""){
        res.json({
            status:"FAILED",
            message:"empty credentials",
            auth:false
        })
    }else{
        let query = "select * from adminusers where email = ?";
        dbcon.query(query,[email],(err,data)=>{
            if(err){
                res.json({
                    status:"FAILED",
                    message:"failed to query database"
                });
                console.log(err);
            }else{
                if(data.length < 1){
                    res.json({
                        status:"FAILED",
                        message:"user doesnot exist",
                        auth:false
                    });
                }else{

                    const email = data[0].email;
                    const adminid = data[0].adminId;
                    const adminfirstName = data[0].firstName;
                    const adminlastName = data[0].lastName;

                    const jwtsecret = jwtsecret + adminid;

                    const payload = {
                        email,
                        adminid
                    }
                    const token = jwt.sign(payload,jwtsecret,{expiresIn : "15m"});
                    //below is the link that shall be sent to the users email
                    const link = `http://localhost:3000/resetpassword/${adminid}/${token}`;
                    
                    res.json({
                        status:"SUCESSFULL",
                        message:"email exists",
                        link,
                        adminfirstName,
                        adminlastName,
                        email
                    });
                   
                }
            }
            
        })
    } 
}

