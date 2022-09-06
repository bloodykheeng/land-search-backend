const dbcon = require("../../../connection");

const rptformtable = (
    Land_Search_Rptform_Id,	
    Parent_Global_Id,	
    Object_Id,	
    Global_Id,	
    CreationDate,	
    Creator_Id,	
    EditDate,	
    Editor_Id		
)=>{
    let feedback, query;
    return  new Promise((resolve,reject)=>{
                query = "select * from rptform where Global_Id = ?"; 
                dbcon.query(query,[Global_Id],(err,result)=>{
                    if(err){
                        feedback = {
                            status:"failed",
                            err:err
                        }
                        reject(feedback);
                    }else if(result.length > 0){
                        feedback = {
                            status:"failed",
                            err:`duplicate entry in rptform table globalid ${Global_Id}`
                        }
                        reject(feedback);
                    }else if(result.length === 0){
                        query = "insert into rptform (Land_Search_Rptform_Id,	Parent_Global_Id,	Object_Id,	Global_Id,	CreationDate,	Creator_Id,	EditDate,	Editor_Id) values(?,?,?,?,?,?,?,?)";

                dbcon.query(query,[
                    Land_Search_Rptform_Id,	
                    Parent_Global_Id,	
                    Object_Id,	
                    Global_Id,	
                    CreationDate,	
                    Creator_Id,	
                    EditDate,	
                    Editor_Id],(err,result)=>{
                     if(err){
                         feedback = {
                            status:"failed",
                            message:`failed to insert into rptform  table  reason: ${err}`
                       };
                         console.log("error inserting data in rptform table",err);
                         reject(feedback);
                     }else{

                         console.log("record with Land_Search_Rptform_Id "+ Land_Search_Rptform_Id +"  : inserted successfully in rptneighbor table");
                       
                         let message ="record with Land_Search_Rptform_Id "+ Land_Search_Rptform_Id +"  : inserted successfully in rptneighbor table";
                         feedback = {
                            status:"successfull",
                            message : message
                       };
                         resolve(feedback);
                     }
                 })

                    }
                })
                
            }
    )}
        
     
 



module.exports = rptformtable;