const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
