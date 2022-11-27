const dbcon = require("../connection.js");
//note the function below will get the clin number from the admin serach
//then it will query all the tables in order to retrieve data to the admin use
const adminsearch = (req, res) => {
  const { clinnumber } = req.body;
  let cld, global_id, owner, neighbour, witness, inspection, rptform;

  let query = `SELECT cld.* , adminusers.username as landsearchregistrar , 
        excell.ExcellFileName as ExcellFileName ,
        geoshape.GeoShapeFileName as GeoShapeFileName,
        ownership.OwnershipType_Name,
        regions.Region_Name,
        districts.District_Name,
        county_or_municipality.County_Name,
        subcounty_or_town.SubCounty_Name,
        parish_or_ward.parish_Name,
        village_or_zone.Village_Name,
        ss.*,
        status_of_survey.Status,
        cc.Creator_Name,
        ce.Creator_Name as Editor_Name,
        pw.parish_Name as Surveyed_Parish_Name
        FROM customary_land_demarcation cld 
                inner join adminusers on cld.Land_Search_Editor_Id = adminusers.adminId
                inner join excellfiles excell on cld.ExcelFileId = excell.ExcelFiles_Id
                inner join geoshape_zip_files geoshape on geoshape.GeoShape_Zip_Files_Id = cld.GeoShape_Zip_Id
                inner join ownershiptype ownership on cld.OwnerShipType_Id = ownership.OwnershipType_Id 
                inner join regions  on cld.Region_Id = regions.Region_Id 
                inner join districts on cld.District_Id = districts.District_Id 
                inner join county_or_municipality on cld.County_Id = county_or_municipality.County_Id 
                inner join subcounty_or_town on cld.SubCounty_Id = subcounty_or_town.SubCounty_Id 
                inner join parish_or_ward on cld.Parish_Id = parish_or_ward.Parish_Id 
                inner join village_or_zone on cld.Village_Id = village_or_zone.Village_Id
                inner join survey_summary ss on ss.Parent_Global_Id = cld.Global_Id
                inner join status_of_survey on status_of_survey.Status_Of_Survey_Id = ss.Status_Of_Survey_Id
                inner join creator cc on cc.Creator_Id = ss.Creator_Id
                inner join creator ce on ce.Creator_Id = ss.Editor_Id
                inner join parish_or_ward pw on ss.Surveyed_Parish_Id = pw.Parish_Id
                where cld.Clin_Number = ?
        `;
  dbcon.query(query, [clinnumber], (err, result) => {
    if (err) {
      res.json({
        status: "failed",
        err: err,
      });
      return;
    } else if (result.length > 0) {
      cld = result;
      global_id = result[0]["Global_Id"];

      let query = `SELECT own.*,
               gender.Gender_Type,
               marital_status.MaritalStatus_Type,
               address.Address_Name,
               cc.Creator_Name,
               ce.Creator_Name as Editor_Name,
               adminusers.username,
               excell.ExcellFileName as ExcellFileName ,
                geoshape.GeoShapeFileName as GeoShapeFileName
               FROM rptowner own 
                              inner join gender on own.Gender_Id = gender.Gender_Id
                              inner join marital_status on marital_status.MaritalStatus_Id = own.Marital_Status_Id
                              inner join address on own.Address_Id = address.Address_Id
                              inner join creator cc on cc.Creator_Id = own.Creator_Id
                              inner join creator ce on ce.Creator_Id = own.Editor_Id
                              inner join adminusers on own.Land_Search_Editor_Id = adminusers.adminId
                              inner join excellfiles excell on own.Excel_File_Id = excell.ExcelFiles_Id
                              inner join geoshape_zip_files geoshape on geoshape.GeoShape_Zip_Files_Id = own.GeoShape_Zip_Id
                              where own.Parent_Global_Id = ?`;
      dbcon.query(query, [global_id], (err, result) => {
        if (err) {
          res.json({
            status: "failed",
            err: err,
          });
          return;
        } else {
          owner = result;
          let query = `SELECT neighbour.*,
                    cc.Creator_Name,
                    ce.Creator_Name as Editor_Name,
                    adminusers.username,
                    excell.ExcellFileName as ExcellFileName ,
                    geoshape.GeoShapeFileName as GeoShapeFileName
                    FROM rptneighbour neighbour 
                                        inner join creator cc on cc.Creator_Id = neighbour.Creator_Id
                                        inner join creator ce on ce.Creator_Id = neighbour.Editor_Id
                                        inner join adminusers on adminusers.adminId  = neighbour.Land_Search_Editor_Id
                                        inner join excellfiles excell on excell.ExcelFiles_Id = neighbour.Excel_File_Id
                                        inner join geoshape_zip_files geoshape on neighbour.GeoShape_Zip_Id = geoshape.GeoShape_Zip_Files_Id 
                                        where neighbour.Parent_Global_Id = ?`;
          dbcon.query(query, [global_id], (err, result) => {
            if (err) {
              res.json({
                status: "failed",
                err: err,
              });
              return;
            } else {
              neighbour = result;
              let query = `SELECT witness.*,
                    cc.Creator_Name,
                    ce.Creator_Name as Editor_Name,     
                    adminusers.username,                
                    excell.ExcellFileName as ExcellFileName ,
                    geoshape.GeoShapeFileName as GeoShapeFileName
                    FROM rptwitness witness 
                                        inner join creator cc on cc.Creator_Id = witness.Creator_Id
                                        inner join creator ce on ce.Creator_Id = witness.Editor_Id
                                        inner join adminusers on adminusers.adminId  = witness.Land_Search_Editor_Id
                                        inner join excellfiles excell on excell.ExcelFiles_Id = witness.Excel_File_Id
                                        inner join geoshape_zip_files geoshape on witness.GeoShape_Zip_Id = geoshape.GeoShape_Zip_Files_Id
                                        where witness.Parent_Global_Id = ?`;
              dbcon.query(query, [global_id], (err, result) => {
                if (err) {
                  res.json({
                    status: "failed",
                    err: err,
                  });
                  return;
                } else {
                  witness = result;

                  let query = `SELECT inspection.*, 
                    cc.Creator_Name,
                    ce.Creator_Name as Editor_Name,
                    adminusers.username,
                    excell.ExcellFileName as ExcellFileName ,
                    geoshape.GeoShapeFileName as GeoShapeFileName
                    FROM rptinspection inspection 
                                        inner join creator cc on cc.Creator_Id = inspection.Creator_Id
                                        inner join creator ce on ce.Creator_Id = inspection.Editor_Id
                                        inner join adminusers on adminusers.adminId  = inspection.Land_Search_Editor_Id
                                        inner join excellfiles excell on excell.ExcelFiles_Id = inspection.Excel_File_Id
                                        inner join geoshape_zip_files geoshape on inspection.GeoShape_Zip_Id = geoshape.GeoShape_Zip_Files_Id
                                        where inspection.Parent_Global_Id = ?`;
                  dbcon.query(query, [global_id], (err, result) => {
                    if (err) {
                      res.json({
                        status: "failed",
                        err: err,
                      });
                      return;
                    } else {
                      inspection = result;

                      let query = `SELECT form.*, 
                    cc.Creator_Name,
                    ce.Creator_Name as Editor_Name,
                    adminusers.username,
                    excell.ExcellFileName as ExcellFileName ,
                    geoshape.GeoShapeFileName as GeoShapeFileName
                    FROM rptform form 
                    inner join creator cc on cc.Creator_Id = form.Creator_Id
                    inner join creator ce on ce.Creator_Id = form.Editor_Id
                    inner join adminusers on adminusers.adminId  = form.Land_Search_Editor_Id
                    inner join excellfiles excell on excell.ExcelFiles_Id = form.Excel_File_Id
                    inner join geoshape_zip_files geoshape on form.GeoShape_Zip_Id = geoshape.GeoShape_Zip_Files_Id
                                        where form.Parent_Global_Id = ?
                    `;
                      dbcon.query(query, [global_id], (err, result) => {
                        if (err) {
                          res.json({
                            status: "failed",
                            err: err,
                          });
                          return;
                        } else {
                          rptform = result;

                          let response = {
                            status: "successfull",
                            cld,
                            owner,
                            neighbour,
                            witness,
                            inspection,
                            rptform,
                          };
                          res.json(response);
                          return;
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      res.json({
        status: "user not found",
        err: "user doesnot exist",
      });
      return;
    }
  });
};
module.exports = adminsearch;
