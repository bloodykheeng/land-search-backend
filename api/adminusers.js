const dbcon = require("../connection.js");

const adminusers = (req, res) => {
  query =
    "select * from adminusers inner join adminaccounttype on adminusers.AccountTypeId = adminaccounttype.AccountTypeId inner join adminuserstatus on adminusers.adminStatusId = adminuserstatus.statusId";

  dbcon.query(query, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
        message: err.message,
      });
    } else {
      //console.log(data);
      res.json({
        status: "successfull",
        message: `admin users data succesfully fetched`,
        data: data,
      });
    }
  });
};

module.exports = adminusers;
