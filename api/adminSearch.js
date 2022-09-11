const dbcon = require("../connection");
//note the function below will get the clin number from the admin serach
//then it will query all the tables in order to retrieve data to the admin use
const adminsearch = (req,res)=>{
    const {clinnumber} = req.body;
    let cld, global_id , owner, neighbour, witness , inspection, rptform;

        let query = `SELECT * FROM customary_land_demarcation 
        inner join adminusers on customary_land_demarcation.Land_Search_Editor_Id = adminusers.adminId
        inner join excellfiles on customary_land_demarcation.ExcelFileId = excellfiles.ExcelFiles_Id
        inner join geoshape_zip_files on geoshape_zip_files.GeoShape_Zip_Files_Id = customary_land_demarcation.GeoShape_Zip_Id
        inner join ownershiptype on customary_land_demarcation.OwnerShipType_Id = ownershiptype.OwnershipType_Id 
        inner join regions on customary_land_demarcation.Region_Id = regions.Region_Id 
        inner join districts on customary_land_demarcation.District_Id = districts.District_Id 
        inner join county_or_municipality on customary_land_demarcation.County_Id = county_or_municipality.County_Id 
        inner join subcounty_or_town on customary_land_demarcation.SubCounty_Id = subcounty_or_town.SubCounty_Id 
        inner join parish_or_ward on customary_land_demarcation.Parish_Id = parish_or_ward.Parish_Id 
        inner join village_or_zone on customary_land_demarcation.Village_Id = village_or_zone.Village_Id
        inner join survey_summary on survey_summary.Parent_Global_Id = customary_land_demarcation.Global_Id
        inner join creator cc on cc.Creator_Id = survey_summary.Creator_Id
        inner join creator ce on ce.Creator_Id = survey_summary.Editor_Id
        where customary_land_demarcation.Clin_Number = ?;`;
        dbcon.query(query,[clinnumber],(err,result)=>{
            if(err){
                res.json({
                    status:"failed",
                    err:err
                });
                return
            }else if(result.length > 0){
               cld = result;
               global_id =  result[0]["Global_Id"];
                
               let query = `SELECT * FROM rptowner 
               inner join gender on rptowner.Gender_Id = gender.Gender_Id
               inner join marital_status on marital_status.MaritalStatus_Id = rptowner.Marital_Status_Id
               inner join address on rptowner.Address_Id = address.Address_Id
               inner join creator cc on cc.Creator_Id = rptowner.Creator_Id
               inner join creator ce on ce.Creator_Id = rptowner.Editor_Id
               inner join adminusers on rptowner.Land_Search_Editor_Id = adminusers.adminId
               inner join excellfiles on rptowner.Excel_File_Id = excellfiles.ExcelFiles_Id
               inner join geoshape_zip_files on geoshape_zip_files.GeoShape_Zip_Files_Id = rptowner.GeoShape_Zip_Id
               where rptowner.Parent_Global_Id = ?`; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    }); 
                    return
                }else{
                    owner = result;
                    let query = `SELECT * FROM rptneighbour 
                    inner join creator cc on cc.Creator_Id = rptneighbour.Creator_Id
                    inner join creator ce on ce.Creator_Id = rptneighbour.Editor_Id
                    inner join adminusers on adminusers.adminId  = rptneighbour.Land_Search_Editor_Id
                    inner join excellfiles on excellfiles.ExcelFiles_Id = rptneighbour.Excel_File_Id
                    inner join geoshape_zip_files on rptneighbour.GeoShape_Zip_Id = geoshape_zip_files.GeoShape_Zip_Files_Id 
                    where rptneighbour.Parent_Global_Id = ?`; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    });
                    return
                }else{
                    neighbour = result;
                    let query = `SELECT * FROM rptwitness 
                    inner join creator cc on cc.Creator_Id = rptwitness.Creator_Id
                    inner join creator ce on ce.Creator_Id = rptwitness.Editor_Id
                    inner join adminusers on adminusers.adminId  = rptwitness.Land_Search_Editor_Id
                    inner join excellfiles on excellfiles.ExcelFiles_Id = rptwitness.Excel_File_Id
                    inner join geoshape_zip_files on rptwitness.GeoShape_Zip_Id = geoshape_zip_files.GeoShape_Zip_Files_Id
                    where rptwitness.Parent_Global_Id = ?`; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    }); 
                    return
                }else{
                    
                    witness = result;
                    
                    let query = `SELECT * FROM rptinspection 
                    inner join creator cc on cc.Creator_Id = rptinspection.Creator_Id
                    inner join creator ce on ce.Creator_Id = rptinspection.Editor_Id
                    inner join adminusers on adminusers.adminId  = rptinspection.Land_Search_Editor_Id
                    inner join excellfiles on excellfiles.ExcelFiles_Id = rptinspection.Excel_File_Id
                    inner join geoshape_zip_files on rptinspection.GeoShape_Zip_Id = geoshape_zip_files.GeoShape_Zip_Files_Id
                    where rptinspection.Parent_Global_Id = ?`; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    }); 
                    return
                }else{
                    inspection = result;
                   
                    let query = `SELECT * FROM rptform 
                    inner join creator cc on cc.Creator_Id = rptform.Creator_Id
                    inner join creator ce on ce.Creator_Id = rptform.Editor_Id
                    inner join adminusers on adminusers.adminId  = rptform.Land_Search_Editor_Id
                    inner join excellfiles on excellfiles.ExcelFiles_Id = rptform.Excel_File_Id
                    inner join geoshape_zip_files on rptform.GeoShape_Zip_Id = geoshape_zip_files.GeoShape_Zip_Files_Id
                    where rptform.Parent_Global_Id = ?
                    `; 
               dbcon.query(query,[global_id],(err,result)=>{
                if(err){
                    res.json({
                        status:"failed",
                        err:err
                    }); 
                    return
                }else{
                    rptform = result;

                    let response = {
                        status:"successfull",
                        cld, 
                        owner, 
                        neighbour, 
                        witness,
                        inspection,
                        rptform
                    }
                    res.json(response);
                    return
                }
                    
            })

                }
                    
            })
                }
                    
            })
    
                }
                    
            })
    
                }
                    
            })

            }else{
                res.json({
                    status:"user not found",
                    err:"user doesnot exist"
                });
                return
            }
                
        })
   
  
}
module.exports = adminsearch;