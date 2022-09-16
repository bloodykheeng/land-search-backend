const express = require("express"); 
const router = express.Router();

const loginapi = require("./api/login.js");
const signupapi = require("./api/signup.js");
const verifyjwt = require("./api/verifyjwt.js");
const uploadfiles = require("./api/myfunctions/uploadfiles");
const refreshapi = require("./api/refreshreact");
const logoutapi = require("./api/logout");
const handlefiles = require("./api/handlefiles");
const usersearch = require("./api/usersearch");
const adminsearch = require("./api/adminSearch");
const resetpwd = require("./api/forgotpassword");

router.post("/signup", signupapi.signup);
router.post("/login", loginapi.login);
router.post("/logout", verifyjwt, logoutapi.logout);
router.post("/fileupload",verifyjwt,uploadfiles,handlefiles);
router.post("/adminsearch",verifyjwt,adminsearch);
router.post("/refresh",verifyjwt, refreshapi.refreshreact);
router.post("/usersearch",usersearch);
router.post("/fogotpassword",resetpwd.fogotpassword);
router.post("/resetpassword",resetpwd.resetpassword);


module.exports = router;