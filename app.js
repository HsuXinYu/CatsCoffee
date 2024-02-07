const express = require("express");
const app = express();
//連接資料庫
const mongoose = require("mongoose");
const Member = require("./models/member");

//因無法直接提出put、patch、delete請求，需下載method-override
const methodOverride = require("method-override");
const { MongoUnexpectedServerResponseError } = require("mongodb");

//來自不同網域請求
const cors = require("cors");

//google Oauth
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
require("./config/passport");

mongoose
  .connect("mongodb://127.0.0.1:27017/members")
  // .connect("mongodb+srv://hsuxinyu:nootrac42@catscoffee.kcggjhf.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("成功連結資料庫...");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

app.post("/login/coffee", async (req, res) => {
  try {
    // console.log(req.body);
    let { login_uname, login_psw } = req.body;
    let found_uname = await Member.findOne({
      sign_up_uname: login_uname,
    }).exec();
    // console.log(found_uname);

    if (!found_uname) {
      return res.send("user_not_found!");
    }

    if (login_psw == found_uname.sign_up_psw) {
      // console.log("login_ok!");
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
    let userExist = await Member.findOne({ sign_up_uname }).exec();
    // console.log(sign_up_uname, userExist);
    if (!userExist) {
      // let hashValue = await bcrypt.hash(password, saltRounds);
      let newMember = new Member({
        name,
        address,
        phone,
        email,
        sign_up_uname,
        sign_up_psw,
      });
      await newMember.save();
      return res.send("sign_up_ok!");
    } else {
      return res.send("sign_up_wrong!");
    }
  } catch (e) {
    return res.status(400).send(e);
  }
});

app.delete("/delete_member/coffee", async (req, res) => {
  try {
    // console.log(req.body);
    let { sign_up_uname } = req.body;
    let deleteData = await Member.deleteOne({ sign_up_uname }).exec();
    // console.log(deleteData);
    if (deleteData) {
      return res.send("delete_member_ok!");
    }
  } catch (e) {
    console.warn(e);
    return res.status(500).send(e.message);
  }
});

//google Oauth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/redirect");

app.listen(8080, () => {
  console.log("正在伺服器8080...");
});
