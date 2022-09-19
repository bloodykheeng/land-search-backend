const dbcon = require("../connection.js");

const updateadminuserstatus = (req,res)=>{
    
    const {adminid , adminStatusId} = req.body;
    let query = "select * from adminusers where adminId = ?";
    
    dbcon.query(query,[adminid],(err,data)=>{
        if(err){
            res.json({
                status:"failed",
                message:"failed to query database"
            });
            console.log(err);
        }else{
            if(data.length < 1){
                res.json({
                    status:"failed",
                    message:"cant update admin status invalid admin id",
                });
            }else if(data.length === 1){
                
                query = "UPDATE adminusers SET adminStatusId = ? WHERE adminId = ?";
                dbcon.query(query,[adminStatusId,adminid],(err)=>{
                    if(err){
                        res.json({
                            status:"failed",
                            message:err.message
                        })
                    }else{

                        query = "select * from adminusers inner join adminaccounttype on adminusers.AccountTypeId = adminaccounttype.AccountTypeId inner join adminuserstatus on adminusers.adminStatusId = adminuserstatus.statusId";

                dbcon.query(query,(err,data)=>{
                    if(err){
                        res.json({
                            status:"failed",
                            message:err.message
                        })
                    }else{
                        res.json({
                            status:"successfull",
                            message:`admin status succesfully updated`,
                            data : data

                        });
                    }
                });
                    }
                });

            }else{
                res.json({
                    status:"failed",
                    message:"more than one admin  instance found please contact land search team",
                });
            }
        }
        
    })

}

module.exports = updateadminuserstatus;