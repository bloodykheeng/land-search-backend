const mysql = require("mysql");
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
const dbcon = mysql.createConnection({
  host: "containers-us-west-82.railway.app",
  port: "7025",
  user: "root",
  password: "p1Tinbkfd28kt0wXU47MO",
  database: "landsearch",
});
module.exports = dbcon;

// mysql -hcontainers-us-west-82.railway.app -uroot -p1Tinbkfd28kt0wXU47MO --port 7025 --protocol=TCP railway
