const uuid = require("uuid");
const dbcon = require("../connection.js");
const bcrypt = require("bcrypt");

exports.signup = (req,res)=>{
    let {firstName, lastName, userName, email, dateOfBirth ,phoneNumber, password} = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    userName = userName.trim();
    email = email.trim();
    dateOfBirth = dateOfBirth.trim();
    phoneNumber = phoneNumber.trim();
    password = password.trim();
    adminId = uuid.v4();

if(firstName == "" || lastName == "" || userName == "" || email == "" || dateOfBirth == "" || phoneNumber == "" || password == ""){
    res.json({
        status:"FAILED",
        message:"some input fields are empty"
    });
}else if(!/^[a-zA-Z ]*$/.test(firstName)){
res.json({
    status:"FAILED",
    message:"invalid firstname"
})
}else if(!/^[a-zA-Z]*$/.test(lastName)){
    res.json({
        status:"FAILED",
        message:"invalid lastname"
    })
    }else if(!/^[a-zA-Z]*$/.test(userName)){
        res.json({
            status:"FAILED",
            message:"invalid username"
        })
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            res.json({
                status:"FAILED",
                message:"invalid email"
            })
            }else if(!new Date(dateOfBirth).getTime()){
                res.json({
                    status:"FAILED",
                    message:"invalid date of birth"
                })
                }else if(password.length < 8){
                    res.json({
                        status:"FAILED",
                        message:"password too short! atleast 8 characters"
                    })
                    }
            else{
                let query = "select * from adminusers where username = ?"

                dbcon.query(query,[userName],(err,result)=>{
                    if(err){
                        res.json({
                            status:"FAILED",
                            message:"failed to query database"
                        })
                    }
                    if(result.length > 0 ){
                        res.json({
                            status:"FAILED",
                            message:"user already exists"
                        })
                    }else{
                        //hashing pwd
                        const saltRounds = 10;
                        bcrypt.hash(password,saltRounds)
                        .then((hashedPassword)=>{
                            query = "insert into adminusers(adminId, firstName, lastName, username, email, dateOfBirth, phoneNumber, password) values (?,?,?,?,?,?,?,?)";
                        dbcon.query(query,[adminId,firstName,lastName,userName,email,dateOfBirth,phoneNumber,hashedPassword],(err)=>{
                            if(err){
                                res.json({
                                    status:"Failed",
                                    message:err.message
                                })
                            }else{
                                res.json({
                                    status:"SUCCESSFULL",
                                    message:`a user called : ${userName} created successfully`
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
