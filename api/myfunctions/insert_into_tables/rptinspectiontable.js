
const dbcon = require("../../../connection");

const rptinspectiontable = (
    Land_Search_Rptinspection_Id,	
    Parent_Global_Id,
    Object_Id,
    Global_Id,	
    CreationDate,	
    Creator_Id,	
    EditDate,	
    Editor_Id		
)=>{
    let feedback;
    return  new Promise((resolve,reject)=>{
        query = "select * from rptinspection where Global_Id = ?"; 
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
                    err:`duplicate entry in rptinspection table globalid ${Global_Id}`
                }
                reject(feedback);
            }else if(result.length === 0){
                query = "insert into rptinspection (Land_Search_Rptinspection_Id, Parent_Global_Id, Object_Id, Global_Id, CreationDate, Creator_Id, EditDate, Editor_Id) values(?,?,?,?,?,?,?,?)";

                dbcon.query(query,[
                    Land_Search_Rptinspection_Id,	
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
                            message:`failed to insert into rptinspection  table  reason: ${err}`
                       };
                         console.log("error inserting data in rptinspection  table",err);
                         reject(feedback);
                     }else{

                         console.log("record with Land_Search_Rptinspection_Id "+ Land_Search_Rptinspection_Id +"  : inserted successfully in rptneighbor table");
                       
                         let message ="record with Land_Search_Rptinspection_Id "+ Land_Search_Rptinspection_Id +"  : inserted successfully in rptneighbor table";
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
        
     
 



module.exports = rptinspectiontable;