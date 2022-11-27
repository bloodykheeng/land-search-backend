const dbcon = require("../connection.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
let jwtsecret = "myjwtsecret";

exports.fogotpassword = (req, res) => {
  let { email } = req.body;
  email = email.trim();

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "invalid email",
      auth: false,
    });
  } else if (!email) {
    res.json({
      status: "FAILED",
      message: "empty credentials",
    });
  } else {
    let query = "select * from adminusers where email = ?";
    dbcon.query(query, [email], (err, data) => {
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
          });
        } else if (data.length > 1) {
          res.json({
            status: "FAILED",
            message: "found more than one user please contact landsearch team",
          });
        } else if (data.length === 1) {
          const email = data[0].email;
          const adminid = data[0].adminId;
          const adminfirstName = data[0].firstName;
          const adminlastName = data[0].lastName;

          let secret = jwtsecret + adminid;

          const payload = {
            email,
            adminid,
          };
          const token = jwt.sign(payload, secret, { expiresIn: "15m" });
          //below is the link that shall be sent to the users email
          // const link = `http://localhost:3000/resetpassword/${adminid}/${token}`;

          // const link = `http://localhost:3000/resetpassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJsb29keWtoZWVuZ0BnbWFpbC5jb20iLCJhZG1pbmlkIjoiNTg0NjQ1MTktZjY3MS00YTJjLWExMDEtOWRhMDI4OTRmMmE0IiwiaWF0IjoxNjYzMzY3OTQ4LCJleHAiOjE2NjMzNjg4NDh9.YF3Pos9M6Sr0M5I69MahBmWSuIr0qdixFA4uxSYlBAM/58464519-f671-4a2c-a101-9da02894f2a4`;

          res.json({
            status: "SUCESSFULL",
            message: "email exists",
            adminid,
            token,
            adminfirstName,
            adminlastName,
            email,
          });
        } else {
          res.json({
            status: "FAILED",
            message: "contact land search team for more help",
          });
        }
      }
    });
  }
};

exports.resetpassword = (req, res) => {
  const { adminid, token, password } = req.body;
  if (!password || !adminid || !password) {
    res.json({
      status: "failed",
      message: "some input fields are empty",
    });
  } else if (password.length < 8) {
    res.json({
      status: "failed",
      message: "password too short! atleast 8 characters",
    });
  } else {
    let query = "select * from adminusers where adminId = ?";

    dbcon.query(query, [adminid], (err, data) => {
      if (err) {
        res.json({
          status: "failed",
          message: "failed to query database",
        });
        console.log(err);
      } else {
        if (data.length < 1) {
          res.json({
            status: "failed",
            message: "user doesnot exist",
          });
        } else if (data.length === 1) {
          let secret = jwtsecret + adminid;
          console.log("reset password token : ", secret);

          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              res.json({
                status: "token-failed",
                message: "wrong token",
              });
            } else {
              //hashing pwd
              const saltRounds = 10;
              bcrypt
                .hash(password, saltRounds)
                .then((hashedPassword) => {
                  query =
                    "UPDATE adminusers SET password = ? WHERE adminId = ?";
                  dbcon.query(query, [hashedPassword, adminid], (err) => {
                    if (err) {
                      res.json({
                        status: "failed",
                        message: err.message,
                      });
                    } else {
                      res.json({
                        status: "successfull",
                        message: `password updated successfully`,
                      });
                    }
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "failed",
                    message: "failed to encrypt password",
                  });
                  console.log("bycrypt encryption errors : ", err);
                });

              //hashing pwd
            }
          });
        } else {
          res.json({
            status: "failed",
            message:
              "more than one user instance please contact land search team",
          });
        }
      }
    });
  }
};
