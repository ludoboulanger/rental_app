const { v4: uuidv4 } = require("uuid");
const { invokeAndSafelyClose } = require("./Connection");
const twilio = require("twilio");

const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = "accountInfo";
const TWILIO_CLIENT = twilio(
  process.env.TWILIO_ACC_SID,
  process.env.TWILIO_AUTH_TOKEN
);
/**
 * Util to persist the accountInfo in the database
 * @param {object} data account data to insert
 * @returns the created account id
 */
const createNewAccountInfo = async (data, activationCode) => {
  const newAccountInfo = {
    _id: uuidv4(),
    ...data,
    activationCode: activationCode,
    createdAt: new Date(),
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
const deleteExistingAccountInfo = async (phone) => {
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

  const [, errorDeletingAccount] = await invokeAndSafelyClose(async (client) =>
    client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .deleteMany({ phoneNumber: phone })
  );

  if (errorDeletingAccount) {
    throw "500";
  }
};

const getAccountInfoById = async (accountId) => {
  const [accountInfo, error] = await invokeAndSafelyClose(async (client) =>
    client.db(DB_NAME).collection(COLLECTION_NAME).findOne({ _id: accountId })
  );

  if (error) {
    throw "500";
  }

  return accountInfo;
};

const sendActivationCode = async (phoneNumber, activationCode) => {
  await TWILIO_CLIENT.messages.create({
    body: `Hello, your Rental verification code is ${activationCode}`,
    from: "+14702840611",
    to: phoneNumber,
  });
};

const validateVerificationCode = async (phoneNumber, code) => {
  const validation = await TWILIO_CLIENT.verify
    .services(process.env.TWILIO_VERIF)
    .verificationChecks.create({ to: phoneNumber, code: code });

  return validation.status;
};

module.exports = {
  createNewAccountInfo,
  deleteExistingAccountInfo,
  sendActivationCode,
  validateVerificationCode,
  getAccountInfoById,
};
