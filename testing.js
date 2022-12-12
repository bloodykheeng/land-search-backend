// const nodemailer = require("nodemailer");
// const {google} = require("googleapis");

// const CLIENT_ID = "47367967276-8o0u9p20s5729dt2m821ol8l3vuc6g2p.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN = "ya29.a0Aa4xrXOVtYl3WFnexR7FFK66TFqpjJ8qalHMGCRhV7NxxcLbOh0PTr86RopUcViSI0LTu-NKZfyGqohZdlh3K2lDed57X0PgXQBxcw7GlhgLUMoYnkdDv1C0GGfurmya1BYCtbKm6L5EZf8nHdHl05vQjPKgaCgYKATASARMSFQEjDvL9CiVpAS_mcBCGTMXpMpCd9w0163";

// const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// OAuth2Client.setCredentials({
//     refresh_token : REFRESH_TOKEN
// });

// async function sendMail(){
//     try{
//         const accessToken = await OAuth2Client.getAccessToken();
//         const transport = nodemailer.createTransport({
//            service : "gmail",
//            auth : {
//             type : "OAuth2",
//             user:"kimerafarouk8@gmail.com",
//             clientId : CLIENT_ID,
//             clientSecret : CLIENT_SECRET,
//             refreshToken : REFRESH_TOKEN,
//             accessToken : accessToken
//            }
//         });

//         const mailOptions = {
//             from : "yourstruly<yourstruly@gmail.com>",
//             to : "bloodykheeng@gmail.com",
//             subject : "hello test landsearch",
//             text : "tokenjjjjjjhello from landsearch i think now the gmail is working",
//             html : "<h1>tokenjjjhello from landsearch i think now the gmail is working</h1>"
//         };
//         const result = await transport.sendMail(mailOptions);
//         return result;
//     }catch(err){
//         return error
//     }
// }

// sendMail().then((result)=>console.log("email sent ... : ",result)).catch((err)=>console.log(err.message));

// const bcrypt = require("bcrypt");
// const dbcon = require("./connection.js");

// const saltRounds = 10;
// const password = "1234567890";
// const adminid = "adfd89d3-fd5e-42f8-86c1-ab38eb4562aa";
// bcrypt
//   .hash(password, saltRounds)
//   .then((hashedPassword) => {
//     query = "UPDATE adminusers SET password = ? WHERE adminId = ?";
//     dbcon.query(query, [hashedPassword, adminid], (err) => {
//       if (err) {
//         // res.json({
//         //   status: "failed",
//         //   message: err.message,
//         // });
//         console.log("error connecting ", err);
//       } else {
//         // res.json({
//         //   status: "successfull",
//         //   message: `password updated successfully`,
//         // });
//         console.log("succesfully updated");
//       }
//     });
//   })
//   .catch((err) => {
//     // res.json({
//     //   status: "failed",
//     //   message: "failed to encrypt password",
//     // });
//     console.log("bycrypt encryption errors : ", err);
//   });

let generateToken = () => {
  let num = "";
  for (let x = 0; x < 8; x++) {
    num += Math.floor(Math.random() * 9);
  }
  return num;
};

let result = generateToken();
console.log(result);
