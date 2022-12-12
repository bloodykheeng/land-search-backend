const dbcon = require("../connection.js");

const gettransactions = (req, res) => {
  query = "SELECT * FROM payments";

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
        message: `transactions successfully fetched`,
        data: data,
      });
    }
  });
};

module.exports = gettransactions;
