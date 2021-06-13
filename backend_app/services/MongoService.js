const { MongoClient } = require("mongodb");
const DB_NAME = process.env.DEV_DB_NAME;
const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

const initMongoConnection = async () => {
  try {
    const client = new MongoClient(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    return client;
  } catch (e) {
    console.error("Error Connecting to Database");
  }
};

const closeMongoConnection = async (client) => {
  try {
    await client.close();
  } catch (e) {
    console.error("Error closing connection to Database");
  }
};

/**
 * This function is used to operate on the mongoDB client. It
 * takes a function to invoke as a parameter and handles the
 * client connection initilization and closing independantly.
 * @param {(client: MongoClient) => object} funcToInvoke:
 *  Async function to invoke on the MongoClient. This function takes a client as a parameter.
 * @returns An array coimposed of the returned by the function
 *  passed in parameters or the error if an error occured
 */
const invokeAndSafelyClose = async (funcToInvoke) => {
  let data = null;
  let error = null;
  try {
    const client = await initMongoConnection();
    data = await funcToInvoke(client);
    await closeMongoConnection(client);
  } catch (e) {
    data = null;
    error = e;
  }

  return [data, error];
};

module.exports = {
  invokeAndSafelyClose,
};