const dbcon = require("../../../connection");

const rptwitnesstable = (
    Land_Search_Rptwitness_Id,
    Parent_Global_Id,	
    Object_Id,	
    Global_Id,	
    Name_Of_The_Witness,	
    CreationDate,	
    Creator_Id,	
    EditDate,	
    Editor_Id		
)=>{
    let feedback;
    return  new Promise((resolve,reject)=>{
     
                query = "insert into rptwitness (Land_Search_Rptwitness_Id, Parent_Global_Id, Object_Id, Global_Id, Name_Of_The_Witness, CreationDate, Creator_Id, EditDate, Editor_Id) values(?,?,?,?,?,?,?,?,?)";

                dbcon.query(query,[
                    Land_Search_Rptwitness_Id,
                    Parent_Global_Id,	
                    Object_Id,	
                    Global_Id,	
                    Name_Of_The_Witness,	
                    CreationDate,	
                    Creator_Id,	
                    EditDate,	
                    Editor_Id],(err,result)=>{
                     if(err){
                         feedback = {
                            status:"failed",
                            message:`failed to insert into rptwitness table  reason: ${err}`
                       };
                         console.log("error inserting data in rptwitness table",err);
                         reject(feedback);
                     }else{

                         console.log("record with Land_Search_Rptwitness_Id "+ Land_Search_Rptwitness_Id +"  : inserted successfully in rptneighbor table");
                       
                         let message ="record with Land_Search_Rptwitness_Id "+ Land_Search_Rptwitness_Id +"  : inserted successfully in rptneighbor table";
                         feedback = {
                            status:"successfull",
                            message : message
                       };

                         resolve(feedback);
                     }
                 })

            }
    )}
        
     
 



module.exports = rptwitnesstable;