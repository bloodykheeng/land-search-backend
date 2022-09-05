const dbcon = require("../../../connection");

const surveySummary = (
    Survey_Summary_Id,
    Parent_Global_Id,
    Date_Of_The_Interview,
    Interviewed_By,
    Status_Of_Survey_Id,
    Supervision_Notes,
    Shape_Area,
    Shape_Length,
    CreationDate,
    Creator_Id,
    EditDate,
    Editor_Id,
    Surveyed_Parish_Id,
    Instrument_Number,
    Recorders_Name,
    regDateAndTime,
    Land_Search_Registration
)=>{
    let feedback;
    return  new Promise((resolve,reject)=>{
     
                query = "insert into survey_summary ( Survey_Summary_Id,Parent_Global_Id, Date_Of_the_Interview, Interviewed_By, Status_Of_Survey_Id,Supervision_Notes, Shape_Area, Shape_Length, CreationDate, Creator_Id, EditDate, Editor_Id, Surveyed_Parish_Id, Instrument_Number, Recorders_Name, regDateAndTime, Land_Search_Registration) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                dbcon.query(query,[
                    Survey_Summary_Id,
                    Parent_Global_Id,
                    Date_Of_The_Interview,
                    Interviewed_By,
                    Status_Of_Survey_Id,
                    Supervision_Notes,
                    Shape_Area,
                    Shape_Length,
                    CreationDate,
                    Creator_Id,
                    EditDate,
                    Editor_Id,
                    Surveyed_Parish_Id,
                    Instrument_Number,
                    Recorders_Name,
                    regDateAndTime,
                    Land_Search_Registration],(err,result)=>{
                     if(err){
                         feedback = {
                            status:"failed",
                            message:`failed to insert into survey_summary  reason: ${err}`
                       };
                         console.log("error inserting data in survey_summary : ",err);
                         reject(feedback);
                     }else{
                        console.log("record with Parent_Global_Id "+ Parent_Global_Id +"  : inserted successfully in survey_summary");
                       
                        let message = "record with Parent_Global_Id "+ Parent_Global_Id +"  : inserted successfully in survey_summary";

                            feedback = {
                                            status:"successfull",
                                            message : message
                                        }

                        
                        resolve(feedback);
                     } 
                     });

} )
}

module.exports = surveySummary;