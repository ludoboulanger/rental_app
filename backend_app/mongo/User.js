const { invokeAndSafelyClose } = require("./Connection");
const { v4: uuidv4 } = require("uuid");
const Crypto = require("crypto");
const bcrypt = require("bcrypt");
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = "user";
const RANDOM_PASS_LENGTH = 30;
const SALT_ROUNDS = 10;

const isExistingPhoneNumber = async (phone) => {
  const [found, error] = await invokeAndSafelyClose(async (client) =>
    client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .findOne({ phoneNumber: phone })
  );

  if (error) {
    throw "500";
  }

  return !!found;
};

const createNewUser = async (accountData) => {
  const randomPassword = Crypto.randomBytes(RANDOM_PASS_LENGTH)
    .toString("base64")
    .slice(0, RANDOM_PASS_LENGTH);

  const hashedPassword = await bcrypt.hash(randomPassword, SALT_ROUNDS);

  const newUserData = {
    _id: uuidv4(),
    firstName: accountData.firstName,
    lastName: accountData.lastName,
    phoneNumber: accountData.phoneNumber,
    email: accountData.email,
    password: hashedPassword,
  };


  const [created, error] = await invokeAndSafelyClose(
    async client => client.db(DB_NAME).collection(COLLECTION_NAME).insertOne(newUserData)
  );

  if (error) {
    throw "500";
  }

  return created.insertedId;
};

module.exports = {
  isExistingPhoneNumber,
  createNewUser
};
