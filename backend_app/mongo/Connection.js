const { MongoClient } = require("mongodb");
const DB_NAME = process.env.DB_NAME;
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
    throw (e);
  }
};

const closeMongoConnection = async (client) => {
  try {
    await client.close();
  } catch (e) {
    console.error("Error closing connection to Database");
    throw (e);
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
  const client = await initMongoConnection();
  try {
    data = await funcToInvoke(client);
  } catch (e) {
    data = null;
    error = e;
  }finally {
    await closeMongoConnection(client);
  }

  return [data, error];
};

/**
 * This function is used to start a connection then a session a run a function in a transaction.
 * It then end the transaction and close the connection.
 * It is meant to be used the same way as {@link invokeAndSafelyClose} but with an extra session parameter.
 * @param {(client: MongoClient) => promise} funcToInvoke :
 * Async function to invoke. It receive the client and the session.
 * @returns An array composed of the returned by the function
 *  passed in parameters or the error if an error occured
 */
const invokeAndSafelyCloseWithTransaction = async (funcToInvoke) => {
  return invokeAndSafelyClose(async client => {
    const session = client.startSession();
    try{
      return session.withTransaction(funcToInvoke(client, session));
    }finally {
      await session.endSession();
    }
  });
};

module.exports = {
  invokeAndSafelyClose,
  invokeAndSafelyCloseWithTransaction
};
