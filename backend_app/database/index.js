const { MongoClient } = require("mongodb");
const DB_NAME = process.env.DEV_DB_NAME;
const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

// Create a new MongoClient
const CLIENT = new MongoClient(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const initMongoConnection = async () => {
  try {
    await CLIENT.connect();
  } catch (e) {
    console.error("Error Connecting to Database");
  }
};

const closeMongoConnection = async () => {
  try {
    await CLIENT.close();
  } catch (e) {
    console.error("Error closing connection to Database");
  }
};

module.exports = {
  initMongoConnection,
  closeMongoConnection,
};
