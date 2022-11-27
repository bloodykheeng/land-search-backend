const cookieparser = require("cookie-parser");
const uuid = require("uuid");
const dbcon = require("../connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtsecret = "myjwtsecret";

exports.login = (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();

  if (username == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "empty credentials",
      auth: false,
    });
  } else {
    let query =
      "select * from adminusers inner join adminaccounttype on adminusers.AccountTypeId = adminaccounttype.AccountTypeId inner join adminuserstatus on adminusers.adminStatusId = adminuserstatus.statusId where username = ?";
    dbcon.query(query, [username, password], (err, data) => {
      if (err) {
        res.json({
          status: "FAILED",
          message: "failed to query database",
        });
        console.log(err);
      } else {
        if (data.length < 1) {
          res.json({
            status: "FAILED",
            message: "user doesnot exist",
            auth: false,
          });
        } else if (data.length === 1) {
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (!result) {
                res.json({
                  status: "FAILED",
                  message: "invalid password",
                  auth: false,
                });
              } else {
                if (data[0].adminStatusId === 1) {
                  let now = new Date();
                  let time = now.getTime();
                  time += 3600 * 1000;
                  now.setTime(time);

                  //const id = data[0].adminId;
                  const admindata = {
                    id: data[0].adminId,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    userName: data[0].username,
                    accountTypeName: data[0].AccountTypeName,
                    statusName: data[0].statusName,
                  };
                  const token = jwt.sign(admindata, jwtsecret, {
                    expiresIn: "1h",
                  });
                  res.cookie("cookie-token", token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: "none",
                  });
                  res.json({
                    status: "SUCESSFULL",
                    message: "signed in sucessfully",
                    token: token,
                    auth: true,
                    data: data,
                  });
                } else if (data[0].adminStatusId === 2) {
                  res.json({
                    status: "FAILED",
                    message:
                      "Account Deactivated : first contact land search team Administrators please",
                    auth: false,
                  });
                } else {
                  res.json({
                    status: "FAILED",
                    message: "cant login contact land search team please",
                    auth: false,
                  });
                }
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message:
                  "an error occured while comparing passwords " + err.message,
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "found that username being used more than once",
          });
        }
      }
    });
  }
};
