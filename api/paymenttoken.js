const uuid = require("uuid");
const dbcon = require("../connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const datetime = require("node-datetime");
const dt = datetime.create();
const mydate = dt.format("Y-m-d H:M:S");
//const mydate = new Date();

const jwtsecret = "myjwtsecret";

let generateToken = () => {
  let num = "";
  for (let x = 0; x < 8; x++) {
    num += Math.floor(Math.random() * 9);
  }
  return num;
};

exports.storepayment = (req, res) => {
  let {
    paypalTxId,
    paypalPayerEmailAddress,
    paypalTxStatus,
    userEmail,
    paypalTxCurrency,
    paypalTxAmount,
  } = req.body;
  console.log("storepayment req body : ", req.body);

  if (
    paypalTxId == "" ||
    paypalPayerEmailAddress == "" ||
    paypalTxStatus == "" ||
    userEmail == "" ||
    paypalTxCurrency == "" ||
    paypalTxAmount == ""
  ) {
    res.json({
      status: "FAILED",
      message: "empty credentials in some fields",
    });
  } else {
    console.log("started storepayment else part ");
    paypalTxId = paypalTxId.trim();
    paypalPayerEmailAddress = paypalPayerEmailAddress.trim();
    paypalTxStatus = paypalTxStatus.trim();
    paypalTxCurrency = paypalTxCurrency.trim();
    paypalTxAmount = paypalTxAmount.trim();
    userEmail = userEmail.trim();
    id = uuid.v4();
    tokenStatus = "active";
    paymentDate = mydate;
    usedDate = "";
    token = generateToken();

    let query =
      "insert into payments (id,paypalTxId,paypalPayerEmailAddress,paypalTxStatus,userEmail,token,tokenStatus,paymentDate,paypalTxCurrency,paypalTxAmount) values (?,?,?,?,?,?,?,?,?,?)";
    dbcon.query(
      query,
      [
        id,
        paypalTxId,
        paypalPayerEmailAddress,
        paypalTxStatus,
        userEmail,
        token,
        tokenStatus,
        paymentDate,
        paypalTxCurrency,
        paypalTxAmount,
      ],
      (err) => {
        if (err) {
          console.log("store database err : ", err);
          res.json({
            status: "Failed",
            msg: `failed to query payments table err : ${err.message}`,
          });
        } else {
          console.log("finished updating database");
          res.json({
            status: "Successfull",
            data: { token, userEmail },
          });
        }
      }
    );
  }
};
