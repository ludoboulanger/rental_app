const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ping = new Schema(
  {
    body: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pings", Ping);
