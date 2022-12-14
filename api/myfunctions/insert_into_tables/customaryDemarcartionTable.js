const dbcon = require("../../../connection.js");

const customaryDemacartionTable = (
  Global_Id,
  Land_Search_Editor_Id,
  Land_Search_RegDate,
  ExcelFileId,
  GeoShape_Zip_Id,
  Minute_Number,
  Clin_Number,
  Object_Id,
  OwnerShipType_id,
  Cla_Name,
  Cla_Certificate_Of_Incorporation_Number,
  Name_Of_The_Community,
  Region_id,
  District_Id,
  County_id,
  SubCounty_id,
  Parish_id,
  Village_id,
  Plot_Number,
  Perimeter_Poly_Km,
  Area_Poly_Ha,
  Land_Use,
  Easements_Or_Other_Persons_Rights,
  Value_Per_Acre,
  Year_Of_Evaluation,
  Comments
) => {
  let feedback;
  return new Promise((resolve, reject) => {
    let query = "select * from customary_land_demarcation where Global_Id = ?";
    dbcon.query(query, [Global_Id], (err, result) => {
      if (err) {
        feedback = {
          status: "failed",
          err: `failed to query database reason: ${err}`,
        };
        console.log(err);
        reject(feedback);
      } else if (result.length > 0) {
        console.log(
          "customaryDemacartionTable log : record with clin number: " +
            Clin_Number +
            " already exists "
        );

        let message =
          "record with clin number: " + Clin_Number + " already exists ";
        feedback = {
          status: "duplicateEntry",
          err: message,
        };
        reject(feedback);
      } else if (result.length == 0) {
        query =
          "insert into customary_land_demarcation (Global_Id,Land_Search_Editor_Id, Land_Search_RegDate, ExcelFileId, GeoShape_Zip_Id , Minute_Number, Clin_Number, Object_Id, OwnerShipType_id, Cla_Name, Cla_Certificate_Of_Incorporation_Number, Name_Of_The_Community, Region_id, District_Id, County_id, SubCounty_id, Parish_id, Village_id, Plot_Number, Perimeter_Poly_Km, Area_Poly_Ha, Land_Use, Easements_Or_Other_Persons_Rights, Value_Per_Acre, Year_Of_Evaluation, Comments) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        dbcon.query(
          query,
          [
            Global_Id,
            Land_Search_Editor_Id,
            Land_Search_RegDate,
            ExcelFileId,
            GeoShape_Zip_Id,
            Minute_Number,
            Clin_Number,
            Object_Id,
            OwnerShipType_id,
            Cla_Name,
            Cla_Certificate_Of_Incorporation_Number,
            Name_Of_The_Community,
            Region_id,
            District_Id,
            County_id,
            SubCounty_id,
            Parish_id,
            Village_id,
            Plot_Number,
            Perimeter_Poly_Km,
            Area_Poly_Ha,
            Land_Use,
            Easements_Or_Other_Persons_Rights,
            Value_Per_Acre,
            Year_Of_Evaluation,
            Comments,
          ],
          (err, result) => {
            if (err) {
              feedback = {
                status: "failed",
                message: `failed to insert into customaryDemacartionTable  reason: ${err}`,
              };
              console.log(
                "error inserting data in customaryDemacartionTable",
                err
              );
              reject(feedback);
            } else {
              console.log(
                "record with clin number " +
                  Clin_Number +
                  "  : inserted successfully in customary_land_demarcation"
              );

              let message =
                "record with clin number " +
                Clin_Number +
                "  : inserted successfully in customary_land_demarcation";
              feedback = {
                status: "successfull",
                message: message,
              };
              resolve(feedback);
            }
          }
        );
      }
    });
  });
};

module.exports = customaryDemacartionTable;
