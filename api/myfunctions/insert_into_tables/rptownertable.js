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
    Address,	
    TelNumber,	
    Email,	
    Id_Nin_Number,	
    CreationDate,	
    Creator_Id,	
    EditDate,	
    Editor_Id	 
)=>{
    let feedback;
    return  new Promise((resolve,reject)=>{
     
                query = "insert into rptowner (Land_Search_RptOwner_Id,Parent_Global_Id, Object_Id, Global_Id, Surname, GivenName, OtherNames,	 Gender_Id,	 Date_Of_Birth,	 Marital_Status_Id,	 Address,	 TelNumber,	 Email,	 Id_Nin_Number,	 CreationDate,	 Creator_Id, EditDate,	Editor_Id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

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
                    Address,	
                    TelNumber,	
                    Email,	
                    Id_Nin_Number,	
                    CreationDate,	
                    Creator_Id,	
                    EditDate,	
                    Editor_Id	],(err,result)=>{
                     if(err){
                         feedback = {
                            status:"failed",
                            message:`failed to insert into rptowner table  reason: ${err}`
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
    )}
        
     
 



module.exports = rptownertable;