const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    hash: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
