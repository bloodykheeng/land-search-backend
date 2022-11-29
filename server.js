const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const fileupload = require("express-fileupload");

const Router = require("./router");

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   })
// );

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(express.json());
app.use(cookieparser());
app.use(fileupload());
app.use(express.static(__dirname, "build"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/", Router);

app.listen(port, () => {
  console.log(`server started on port : ${port}`);
});
