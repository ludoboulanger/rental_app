const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: { type: "string", required: true },
    firstname: { type: "string", required: true },
    lastname: { type: "string", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
