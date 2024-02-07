const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
  name: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  sign_up_psw: { type: String },
  googleID: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
