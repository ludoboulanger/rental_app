const { invokeAndSafelyClose } = require("./Connection");
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = "user";

const isExistingPhoneNumber = (phone) => {
  const [found, error] = invokeAndSafelyClose(async (client) =>
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

module.exports = {
  isExistingPhoneNumber,
};
