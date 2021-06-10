const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    userId: String,
    name: String,
    email: String,
    passwordHash: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
