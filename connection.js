const mysql = require("mysql");
let config = require("./config");
let { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = config;
const dbcon = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
dbcon.connect(function (err) {
  if (err) {
    return console.log("mysql connect error is : ".err.message);
  }

  console.log("connected succesfuly");
});
module.exports = dbcon;

// const dbcon = mysql.createConnection({
//   host: "10.129.2.155:3306",
//   user: "root",
//   password: "",
//   database: "landsearch",
// });

// const dbcon = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "landsearch",
// });

// mysql -hcontainers-us-west-82.railway.app -uroot -p1Tinbkfd28kt0wXU47MO --port 7025 --protocol=TCP railway
