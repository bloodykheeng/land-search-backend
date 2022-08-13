const express = require("express"); 
const router = express.Router();

const loginapi = require("./api/login.js");
const signupapi = require("./api/signup.js");
const verifyjwt = require("./api/verifyjwt.js");
const fileuploadapi = require("./api/fileupload");

router.post("/signup", signupapi.signup)
router.post("/login", loginapi.login)
router.post("/fileupload",fileuploadapi.fileupload);

module.exports = router;