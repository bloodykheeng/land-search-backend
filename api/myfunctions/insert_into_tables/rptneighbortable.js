const dbcon = require("../../../connection.js");

const rptneighbortable = (
  Land_Search_RptNeighbour_Id,
  Parent_Global_Id,
  Object_Id,
  Global_Id,
  Name_Of_Adjacent_Owner,
  CreationDate,
  Creator_Id,
  EditDate,
  Editor_Id,
  Land_Search_Editor_Id,
  Excel_File_Id,
  GeoShape_Zip_Id,
  Land_Search_RegDate
) => {
  let feedback;
  return new Promise((resolve, reject) => {
    query = "select * from rptneighbour where Global_Id = ?";
    dbcon.query(query, [Global_Id], (err, result) => {
      if (err) {
        feedback = {
          status: "failed",
          err: err,
        };
        reject(feedback);
      } else if (result.length > 0) {
        feedback = {
          status: "failed",
          err: `duplicate entry in rptneighbour table globalid ${Global_Id}`,
        };
        reject(feedback);
      } else if (result.length === 0) {
        query =
          "insert into rptneighbour (Land_Search_RptNeighbour_Id, Parent_Global_Id, Object_Id,  Global_Id, Name_Of_Adjacent_Owner,  CreationDate, Creator_Id, EditDate, Editor_Id , Land_Search_Editor_Id, Excel_File_Id,	GeoShape_Zip_Id, Land_Search_RegDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";

        dbcon.query(
          query,
          [
            Land_Search_RptNeighbour_Id,
            Parent_Global_Id,
            Object_Id,
            Global_Id,
            Name_Of_Adjacent_Owner,
            CreationDate,
            Creator_Id,
            EditDate,
            Editor_Id,
            Land_Search_Editor_Id,
            Excel_File_Id,
            GeoShape_Zip_Id,
            Land_Search_RegDate,
          ],
          (err, result) => {
            if (err) {
              feedback = {
                status: "failed",
                err: `failed to insert into rptneighbor table  reason: ${err}`,
              };
              console.log("error inserting data in rptneighbor table", err);
              reject(feedback);
            } else {
              console.log(
                "record with Land_Search_RptNeighbour_Id " +
                  Land_Search_RptNeighbour_Id +
                  "  : inserted successfully in rptneighbor table"
              );

              let message =
                "record with Land_Search_RptNeighbour_Id " +
                Land_Search_RptNeighbour_Id +
                "  : inserted successfully in rptneighbor table";
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

module.exports = rptneighbortable;
