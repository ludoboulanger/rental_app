const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { invokeAndSafelyClose } = require("../../services/MongoService");

/*
  -- USERS --
*/

/**
 * Util to check if the user already exists in the database or not
 * @param {string} email Email to check for
 * @returns a boolean indicating if the user exists or not
 */
const checkIfEmailExists = async (email) => {
  const [foundEmail, errorCheckingEmail] = await invokeAndSafelyClose(
    async (client) =>
      client
        .db(process.env.DEV_DB_NAME)
        .collection("users")
        .findOne({ email: email })
  );

  if (errorCheckingEmail) {
    throw Error("500");
  }

  if (foundEmail) {
    return true;
  }

  return false;
};

const SALT_ROUNDS = 10;
/**
 * Util to persist the user in the database
 * @param {object} data User data to insert
 * @returns the created user
 */
const insertNewUser = async (data) => {
  data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  const newUser = {
    _id: uuidv4(),
    ...data,
    status: "pending",
    activationCode: "",
  };

  const [created, errorCreatingUser] = await invokeAndSafelyClose(
    async (client) =>
      client.db(process.env.DEV_DB_NAME).collection("users").insertOne(newUser)
  );

  if (errorCreatingUser || created.result.ok !== 1) {
    throw Error("500");
  }

  return created;
};

module.exports = {
  checkIfEmailExists,
  insertNewUser,
};
