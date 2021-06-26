const { v4: uuidv4 } = require("uuid");
const { invokeAndSafelyClose } = require("./Connection");
const twilio = require("twilio");
const GenerateVerificationCode = require("./utils/GenerateVerificationCode");

const VERIFICATION_CODE_LENGTH = 6;
const DB_NAME = process.env.DB_NAME;
const TWILIO_PHONE = process.env.TWILIO_PHONE;
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
const createNewAccountInfo = async (data) => {
  const newCode = GenerateVerificationCode(VERIFICATION_CODE_LENGTH);
  const newAccountInfo = {
    _id: uuidv4(),
    ...data,
    activationCode: newCode,
    lastModified: new Date(),
  };

  const [created, errorCreatingUser] = await invokeAndSafelyClose(
    async (client) =>
      client.db(DB_NAME).collection(COLLECTION_NAME).insertOne(newAccountInfo)
  );

  if (errorCreatingUser || created.result.ok !== 1) {
    throw new Error();
  }

  return {
    ok: created.result.ok,
    id: created.insertedId,
    code: newCode,
  };
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
    throw new Error();
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
    throw new Error();
  }
};

/**
 * Util to find the accountInfo By Id
 * @param {string} accountId
 * @returns {string} accountInfo object
 */
const getAccountInfoById = async (accountId) => {
  const [accountInfo, error] = await invokeAndSafelyClose(async (client) =>
    client.db(DB_NAME).collection(COLLECTION_NAME).findOne({ _id: accountId })
  );

  if (error) {
    throw new Error();
  }

  return accountInfo;
};

/**
 * Util to send an activation code with the Twilio client
 * @param {string} phoneNumber Destination phone number
 * @param {string} activationCode Activation code for the account
 */
const sendActivationCode = async (phoneNumber, activationCode) => {
  await TWILIO_CLIENT.messages.create({
    body: `Hello, your Rental verification code is ${activationCode}`,
    from: TWILIO_PHONE,
    to: phoneNumber,
  });
};

/**
 * Util to update the code in case the user didnt receive one the first time
 * @param {*} accountId The Account Id for which the code needs updating
 * @param {*} code the new verification code
 * @returns the status of the update query
 */
const updateVerificationCode = async (accountId) => {
  const newCode = GenerateVerificationCode(VERIFICATION_CODE_LENGTH);
  const [result, error] = await invokeAndSafelyClose(
    async client => client
      .db(process.env.DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        {_id: accountId},
        {
          $set: {
            activationCode: newCode,
            lastModified: new Date(),
          }
        })
  );

  if (error) {
    throw new Error();
  }

  return {
    ok: result.result.ok,
    code: newCode
  };
};

module.exports = {
  createNewAccountInfo,
  deleteExistingAccountInfo,
  sendActivationCode,
  updateVerificationCode,
  getAccountInfoById,
};
