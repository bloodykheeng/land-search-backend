const dbcon = require("../../../connection");

const rptneighbortable = (
    Land_Search_RptNeighbour_Id,
    Parent_Global_Id,
    Object_Id,
    Global_Id,
    Name_Of_Adjacent_Owner,
    CreationDate,
    Creator_Id,	
    EditDate,
    Editor_Id	
)=>{
    let feedback;
    return  new Promise((resolve,reject)=>{
     
                query = "insert into rptneighbour (Land_Search_RptNeighbour_Id, Parent_Global_Id, Object_Id,  Global_Id, Name_Of_Adjacent_Owner,  CreationDate, Creator_Id, EditDate, Editor_Id) values(?,?,?,?,?,?,?,?,?)";

                dbcon.query(query,[
                    Land_Search_RptNeighbour_Id,
                    Parent_Global_Id,
                    Object_Id,
                    Global_Id,
                    Name_Of_Adjacent_Owner,
                    CreationDate,
                    Creator_Id,	
                    EditDate,
                    Editor_Id],(err,result)=>{
                     if(err){
                         feedback = {
                            status:"failed",
                            message:`failed to insert into rptneighbor table  reason: ${err}`
                       };
                         console.log("error inserting data in rptneighbor table",err);
                         reject(feedback);
                     }else{

                         console.log("record with Land_Search_RptNeighbour_Id "+ Land_Search_RptNeighbour_Id +"  : inserted successfully in rptneighbor table");
                       
                         let message ="record with Land_Search_RptNeighbour_Id "+ Land_Search_RptNeighbour_Id +"  : inserted successfully in rptneighbor table";
                         feedback = {
                            status:"successfull",
                            message : message
                       };

                         resolve(feedback);
                     }
                 })

            }
    )}
        
     
 



module.exports = rptneighbortable;