const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/RentAllDB", { useNewUrlParser: true,  useUnifiedTopology: true  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const Database = mongoose.connection;

module.exports = Database;
