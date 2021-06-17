const { v4: uuidv4 } = require("uuid");
const { invokeAndSafelyClose } = require("./Connection");

const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = "accountInfo";
/**
 * Util to persist the accountInfo in the database
 * @param {object} data account data to insert
 * @returns the created account id
 */
const createNewAccountInfo = async (data) => {
  const newAccountInfo = {
    _id: uuidv4(),
    ...data,
    isActive: false,
    activationCode: "",
  };

  const [created, errorCreatingUser] = await invokeAndSafelyClose(
    async (client) =>
      client.db(DB_NAME).collection(COLLECTION_NAME).insertOne(newAccountInfo)
  );

  if (errorCreatingUser || created.result.ok !== 1) {
    throw "500";
  }

  return created.insertedId;
};

/**
 * Util to ensure that only one account per email can be active at a time. This way,
 * it is impossible to flood the database with inactive accounts
 * @param {String} email
 * @returns {void}
 */
const deleteExistingAccountInfoIfNeeded = async (phone) => {
  const [account, errorGettingAccount] = await invokeAndSafelyClose(
    async (client) =>
      client
        .db(DB_NAME)
        .collection(COLLECTION_NAME)
        .findOne({ phoneNumber: phone })
  );

  if (errorGettingAccount) {
    throw "500";
  }

  if (!account) {
    return;
  }

  const [, errorDeletingAccount] = await invokeAndSafelyClose(
    async (client) =>
      client
        .db(DB_NAME)
        .collection(COLLECTION_NAME)
        .deleteMany({ phoneNumber: phone })
  );

  if (errorDeletingAccount) {
    throw "500";
  }
};

module.exports = {
  createNewAccountInfo,
  deleteExistingAccountInfoIfNeeded,
};
