const { MongoClient } = require("mongodb");
const DB_NAME = process.env.DB_NAME;
const TEST_DB_NAME = process.env.TEST_DB_NAME;
const DB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;
const TEST_URI = `mongodb://127.0.0.1:27017/${TEST_DB_NAME}`;

const initMongoConnection = async (test) => {
  let client;
  try {
    if (test) {
      client = new MongoClient(TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } else {
      client = new MongoClient(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

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
 * @param {boolean} test determines if we connect to our test database or our real database
 *  Async function to invoke on the MongoClient. This function takes a client as a parameter.
 * @returns An array coimposed of the returned by the function
 *  passed in parameters or the error if an error occured
 */
const invokeAndSafelyClose = async (funcToInvoke, test = false) => {
  let data = null;
  let error = null;
  try {
    const client = await initMongoConnection(test);
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
