const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const Member = require("../models/member");

passport.serializeUser((user, done) => {
  console.log("serialze使用者");
  console.log(user);
  //將mongoDB的id存放在session，並將id簽名後以cookie的形式給使用者
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log("Deserialze使用者");
  let foundUser = await Member.findOne({ _id });
  done(null, foundUser); //將req.user這個屬性設定為foundUser
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      let foundUser = await Member.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("使用者已經註冊過了");
        done(null, foundUser);
      } else {
        console.log("偵測到新用戶");
        let newUser = new Member({
          name: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        let savedUser = await newUser.save();
        console.log("成功創建新用戶" + savedUser);
        done(null, savedUser);
      }
    }
  )
);
