const express = require("express"); 
const router = express.Router();

const loginapi = require("./api/login.js");
const signupapi = require("./api/signup.js");
const verifyjwt = require("./api/verifyjwt.js");
const fileuploadapi = require("./api/fileupload");
const refreshapi = require("./api/refreshreact");
const logoutapi = require("./api/logout");

router.post("/signup", signupapi.signup)
router.post("/login", loginapi.login)
router.post("/logout", verifyjwt, logoutapi.logout)
router.post("/fileupload",verifyjwt,fileuploadapi.fileupload);
router.post("/refresh",verifyjwt, refreshapi.refreshreact)


module.exports = router;