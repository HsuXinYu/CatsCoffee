const mongoose = require("mongoose");
const { Schema } = mongoose;

const mumberSchema = new Schema({
  name: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  sign_up_uname: { type: String },
  sign_up_psw: { type: String },
});

const Mumber = mongoose.model("Mumber", mumberSchema);
module.exports = Mumber;
