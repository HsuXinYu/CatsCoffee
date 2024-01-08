const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Mumber = require("./models/member");
const cors = require("cors");
//google Oauth
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
require("./config/passport");

//因無法直接提出put、patch、delete請求，需下載method-override
const methodOverride = require("method-override");
const { MongoUnexpectedServerResponseError } = require("mongodb");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/mumbers")
//   .then(() => {
//     console.log("成功連結資料庫...");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride("_method"));

app.post("/login/coffee", async (req, res) => {
  try {
    console.log(req.body);
    let { login_uname, login_psw } = req.body;
    let found_uname = await Mumber.findOne({
      sign_up_uname: login_uname,
    }).exec();
    console.log(found_uname);

    if (!found_uname) {
      return res.send("user_not_found!");
    }

    if (login_psw == found_uname.sign_up_psw) {
      console.log("login_ok!");
      return res.send("login_ok!");
    } else {
      return res.send("login_wrong!");
    }
  } catch (e) {
    console.warn(e);
    return res.status(500).send(e.message);
  }
});

app.post("/sign_up/coffee", async (req, res) => {
  try {
    let { name, address, phone, email, sign_up_uname, sign_up_psw } = req.body;
    let userExist = await Mumber.findOne({ sign_up_uname }).exec();
    console.log(sign_up_uname, userExist);
    if (!userExist) {
      // let hashValue = await bcrypt.hash(password, saltRounds);
      let newMumber = new Mumber({
        name,
        address,
        phone,
        email,
        sign_up_uname,
        sign_up_psw,
      });
      await newMumber.save();
      return res.send("sign_up_ok!");
    } else {
      return res.send("sign_up_wrong!");
    }
  } catch (e) {
    return res.status(400).send(e);
  }
});

app.delete("/delete_mumber/coffee", async (req, res) => {
  try {
    console.log(req.body);
    let { sign_up_uname } = req.body;
    let deleteData = await Mumber.deleteOne({ sign_up_uname }).exec();
    console.log(deleteData);
    if (deleteData) {
      return res.send("delete_mumber_ok!");
    }
  } catch (e) {
    console.warn(e);
    return res.status(500).send(e.message);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/redirect");

// var fs = require("fs");
// var https = require("https");
// var privateKey = fs.readFileSync("sslcert/server.key", "utf8");
// var certificate = fs.readFileSync("sslcert/server.crt", "utf8");

// var credentials = { key: privateKey, cert: certificate };
// var httpsServer = https.createServer(credentials, app);

// httpsServer.listen(8443);

app.listen(8080, () => {
  console.log("正在伺服器8080...");
});
