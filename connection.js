const mysql = require("mysql");
const dbcon = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"landsearch"
});
module.exports = dbcon;