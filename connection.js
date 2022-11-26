const mysql = require("mysql");
const dbcon = mysql.createConnection({
  host: "10.129.2.155:3306",
  user: "root",
  password: "",
  database: "landsearch",
});
module.exports = dbcon;
// host :"10.129.2.155"
// port :"3306"
// // host : "172.30.145.190:3306"
