const dbcon = require("../../../connection");

const rptownertable = (
    Land_Search_RptOwner_Id,
    Parent_Global_Id,
    Object_Id,
    Global_Id,
    Surname,
    GivenName,
    OtherNames,	
    Gender_Id,	
    Date_Of_Birth,	
    Marital_Status_Id,	
    Address_Id,	
    TelNumber,	
    Email,	
    Id_Nin_Number,	
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
        query = "select * from rptowner where Global_Id = ?"; 
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
                    err:`duplicate entry in rptowner table globalid ${Global_Id}`
                }
                reject(feedback);
            }else if(result.length === 0){

                query = "insert into rptowner (Land_Search_RptOwner_Id,Parent_Global_Id, Object_Id, Global_Id, Surname, GivenName, OtherNames,	 Gender_Id,	 Date_Of_Birth,	 Marital_Status_Id,	 Address_Id,	 TelNumber,	 Email,	 Id_Nin_Number,	 CreationDate,	 Creator_Id, EditDate,	Editor_Id,Land_Search_Editor_Id, Excel_File_Id, GeoShape_Zip_Id ,Land_Search_RegDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                dbcon.query(query,[
                    Land_Search_RptOwner_Id,
                    Parent_Global_Id,
                    Object_Id,
                    Global_Id,
                    Surname,
                    GivenName,
                    OtherNames,	
                    Gender_Id,	
                    Date_Of_Birth,	
                    Marital_Status_Id,	
                    Address_Id,	
                    TelNumber,	
                    Email,	
                    Id_Nin_Number,	
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
                            err:`failed to insert into rptowner table  reason: ${err}`
                       };
                         console.log("error inserting data in rptowner table",err);
                         reject(feedback);
                     }else{

                         console.log("record with Land_Search_RptOwner_Id "+ Land_Search_RptOwner_Id +"  : inserted successfully in rptowner table");
                       
                         let message ="record with Land_Search_RptOwner_Id "+ Land_Search_RptOwner_Id +"  : inserted successfully in rptowner table";
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
        
     
 



module.exports = rptownertable;