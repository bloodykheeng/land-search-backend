const uuid = require("uuid");
const dbcon = require("../connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const datetime = require("node-datetime");
let dt = datetime.create();
let mydate = dt.format("d-m-y H:M:S");

exports.validateToken = (req, res) => {
  let { token, userEMail } = req.body;
  console.log("req body is ", req.body);
  if (token == "" || userEMail == "") {
    res.json({
      status: "FAILED",
      message: "token empty",
    });
  } else {
    token = token.trim();
    userEMail = userEMail.trim();

    let query =
      "SELECT * FROM payments where userEmail = ? and token = ? and tokenStatus = 'active'";
    dbcon.query(query, [userEMail, token], (err, data) => {
      if (err) {
        res.json({
          status: "FAILED",
          message: "failed to query database for token",
        });
        console.log(err);
      } else {
        console.log("finished querying for token");
        if (data.length < 1) {
          res.json({
            status: "FAILED",
            message: "wrong token",
          });
        } else {
          let currentdate = mydate;
          let id = data[0].id;
          //console.log("data from db : ", data);
          //console.log("data from id: ", id);
          //updating token status
          let query =
            "update payments set tokenStatus = ? , usedDate = now() where id = ?";
          dbcon.query(query, ["deactivated", id], (err, data) => {
            if (err) {
              res.json({
                status: "FAILED",
                message:
                  "failed to query database for while updating token status",
                error: `${err.message}`,
              });
              //console.log(err.message);
            } else {
              res.json({
                status: "Succesfull",
                msg: "token exists",
              });
            }
          });
        }
      }
    });
  }
};
