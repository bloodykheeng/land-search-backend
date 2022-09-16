const cookieparser = require("cookie-parser");
const dbcon = require("../connection.js");

const jwt = require("jsonwebtoken");
let jwtsecret = "myjwtsecret";

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
                        message:"user doesnot exist"
                    });
                }else{

                    const email = data[0].email;
                    const adminid = data[0].adminId;
                    const adminfirstName = data[0].firstName;
                    const adminlastName = data[0].lastName;

                    jwtsecret = jwtsecret + adminid;

                    const payload = {
                        email,
                        adminid
                    }
                    const token = jwt.sign(payload,jwtsecret,{expiresIn : "15m"});
                    //below is the link that shall be sent to the users email
                    const link = `http://localhost:3000/resetpassword/${adminid}/${token}`;
                    
                    // const link = `http://localhost:3000/resetpassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJsb29keWtoZWVuZ0BnbWFpbC5jb20iLCJhZG1pbmlkIjoiNTg0NjQ1MTktZjY3MS00YTJjLWExMDEtOWRhMDI4OTRmMmE0IiwiaWF0IjoxNjYzMzY3OTQ4LCJleHAiOjE2NjMzNjg4NDh9.YF3Pos9M6Sr0M5I69MahBmWSuIr0qdixFA4uxSYlBAM/58464519-f671-4a2c-a101-9da02894f2a4`;

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

exports.resetpassword = ()=>{
    const {adminid , token, password} = req.body;
    let query = "select * from adminusers where adminId = ?";
    dbcon.query(query,[adminid],(err,data)=>{
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
                });
            }else{
                
                jwtsecret = jwtsecret + adminid;

                    jwt.verify(token,jwtsecret,(err,decoded)=>{
                        if(err){
                            res.json({
                                status:"token-failed",
                                message:"wrong token",
                            })
                           
                        }else{

                            //hashing pwd
                        const saltRounds = 10;
                        bcrypt.hash(password,saltRounds)
                        .then((hashedPassword)=>{
                            query = "UPDATE adminusers SET password = ? WHERE adminId = ?";
                        dbcon.query(query,[hashedPassword,adminId],(err)=>{
                            if(err){
                                res.json({
                                    status:"Failed",
                                    message:err.message
                                })
                            }else{
                                res.json({
                                    status:"SUCCESSFULL",
                                    message:`password updated successfully`
                                })
                            }
                        })
                        })
                        .catch((err)=>{
                            res.json({
                                status:"FAILED",
                                message:"failed to encrypt password"
                            })
                        })
                        
                    //hashing pwd
                        }
                    })
               
                
            }
        }
        
    })

}