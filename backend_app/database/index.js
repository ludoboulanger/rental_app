const mongoose = require("mongoose");
const DB_NAME = process.env.DEV_DB_NAME;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const Database = mongoose.connection;

module.exports = Database;
