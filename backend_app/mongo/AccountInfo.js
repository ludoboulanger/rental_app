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
 * @returns [{ok, id, code}, null] if success or [null, error] if error
 */
const createNewAccountInfo = async (data) => {
  const newCode = GenerateVerificationCode(VERIFICATION_CODE_LENGTH);
  const newAccountInfo = {
    ...data,
    activationCode: newCode,
    lastModified: new Date(),
    attempts: 0,
  };

  const [result, error] = await invokeAndSafelyClose(
    async (client) =>
      client.db(DB_NAME).collection(COLLECTION_NAME).findOneAndUpdate(
        {phoneNumber: newAccountInfo.phoneNumber},
        {
          $set: {...newAccountInfo},
          $setOnInsert: {_id: uuidv4()}
        },
        {upsert: true}
      ));

  if (error) {
    return [ null, error];
  }

  if(result.value) {
    // Document was updated
    return [{ ok: result.ok, id: result.value._id, code: newCode }, null];
  } else {
    // Document was inserted
    return [{ ok: result.ok, id: result.lastErrorObject.upserted, code: newCode}, null];
  }
};

/**
 * Util to ensure that only one account per email can be active at a time. This way,
 * it is impossible to flood the database with inactive accounts
 * @param {String} email
 * @returns {void}
 */
const deleteExistingAccountInfo = async (phone) => {
  const [result, error] = await invokeAndSafelyClose(
    async (client) =>
      client
        .db(DB_NAME)
        .collection(COLLECTION_NAME)
        .findOneAndDelete({ phoneNumber: phone })
  );

  if (error) {
    return [null, error];
  }

  if (!result.value) {
    return [{ok: 0}, null];
  }

  return [{ok: 1}, null];
};

/**
 * Util to find the accountInfo By Id. This is a wrapper to facilitate interaction with mongo
 * @param {string} accountId
 * @returns {string} accountInfo object
 */
const getAccountInfoById = async (accountId) => {
  return  invokeAndSafelyClose(async (client) =>
    client.db(DB_NAME).collection(COLLECTION_NAME).findOne({ _id: accountId })
  );
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
      .db(DB_NAME)
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

const incrementAttemptsForAccount = async accountId => {
  const [result, error] = await invokeAndSafelyClose(
    async client => client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        {_id: accountId},
        {
          $inc: {
            attempts: 1,
          }
        }
      )
  );

  if (error) {
    throw new Error();
  }

  return {
    ok: result.result.ok,
  };
};

const isVerificationCodeFormatValid = (code) => {
  try {
    if (Number(code) <= 999999) {
      return true;
    } else  {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports = {
  createNewAccountInfo,
  deleteExistingAccountInfo,
  sendActivationCode,
  updateVerificationCode,
  incrementAttemptsForAccount,
  isVerificationCodeFormatValid,
  getAccountInfoById,
};
