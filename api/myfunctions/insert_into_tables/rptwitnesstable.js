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
    Editor_Id,
    Land_Search_Editor_Id,	
    Excel_File_Id,	
    GeoShape_Zip_Id,	
    Land_Search_RegDate		
)=>{
    let feedback;
    return  new Promise((resolve,reject)=>{
        query = "select * from rptwitness where Global_Id = ?"; 
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
                    err:`duplicate entry in rptwitness table globalid ${Global_Id}`
                }
                reject(feedback);
            }else if(result.length === 0){
                query = "insert into rptwitness (Land_Search_Rptwitness_Id, Parent_Global_Id, Object_Id, Global_Id, Name_Of_The_Witness, CreationDate, Creator_Id, EditDate, Editor_Id, Land_Search_Editor_Id,	 Excel_File_Id,	GeoShape_Zip_Id,	 Land_Search_RegDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";

                dbcon.query(query,[
                    Land_Search_Rptwitness_Id,
                    Parent_Global_Id,	
                    Object_Id,	
                    Global_Id,	
                    Name_Of_The_Witness,	
                    CreationDate,	
                    Creator_Id,	
                    EditDate,	
                    Editor_Id,
                    Land_Search_Editor_Id,	
                    Excel_File_Id,	
                    GeoShape_Zip_Id,	
                    Land_Search_RegDate
                ],(err,result)=>{
                     if(err){
                         feedback = {
                            status:"failed",
                            err:`failed to insert into rptwitness table  reason: ${err}`
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
        })

              

            }
    )}
        
     
 



module.exports = rptwitnesstable;