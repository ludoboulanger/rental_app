const faker = require("faker");
const { v4: uuidv4} = require("uuid");

const getValidSignUpInformation = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  };
};

const getInvalidVerificationCode = () => {
  return {
    code: "987654",
  };
};

const getValidVerificationCode = () => {
  return {
    code: "123456",
  };
};

const getMalFormattedVerificationCode = () => {
  return {
    code: "IamNotACode"
  };
};

const getRandomUUID = () => {
  return uuidv4();
};

const getInvalidUUID = () => {
  return faker.random.word();
};

module.exports = {
  getValidSignUpInformation,
  getInvalidVerificationCode,
  getValidVerificationCode,
  getMalFormattedVerificationCode,
  getRandomUUID,
  getInvalidUUID,
};