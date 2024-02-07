const express = require("express");
const app = express();

//連接資料庫
const { MongoUnexpectedServerResponseError } = require("mongodb");
const mongoose = require("mongoose");
const Member = require("./models/member");
mongoose
  .connect("mongodb://127.0.0.1:27017/members")
  // .connect("mongodb+srv://hsuxinyu:nootrac42@catscoffee.kcggjhf.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("成功連結資料庫...");
  })
  .catch((e) => {
    console.log(e);
  });

//來自不同網域請求
const cors = require("cors");

//因無法直接提出put、patch、delete請求，需下載method-override
const methodOverride = require("method-override");

//google Oauth
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
require("./config/passport");

const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.session());

app.post("/login/coffee", async (req, res) => {
  try {
    // console.log(req.body);
    let { login_email, login_psw } = req.body;
    let found_user = await Member.findOne({
      email: login_email,
    }).exec();
    // console.log(found_uname);

    if (!found_user) {
      return res.send("user_not_found!");
    }

    if (login_psw == found_user.sign_up_psw) {
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
    let { name, address, phone, sign_up_email, sign_up_psw } = req.body;
    let userExist = await Member.findOne({ email: sign_up_email }).exec();
    // console.log(sign_up_uname, userExist);
    if (!userExist) {
      // let hashValue = await bcrypt.hash(password, saltRounds);
      let newMember = new Member({
        name,
        address,
        phone,
        email: sign_up_email,
        sign_up_psw,
      });
      await newMember.save();
      return res.send("sign_up_ok!");
    } else {
      return res.send("sign_up_wrong!");
    }
  } catch (e) {
    console.dir(e);
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

app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    console.log("redirect");
    console.log(res);
    return res.redirect("http://172.20.10.5:5500/docs/index.html");
  }
);

app.listen(8080, () => {
  console.log("正在伺服器8080...");
});
