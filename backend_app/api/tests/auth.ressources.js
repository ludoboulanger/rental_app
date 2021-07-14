const faker = require("faker");
const { v4: uuidv4} = require("uuid");

// MONGO MOCKS
const userCreatedStub = "9eb7bdc3-fb64-41fe-83da-052febf8b4dd";

const successCreateAccountInfo = [{
  ok: 1,
  id: userCreatedStub,
  code: "123456",
}, null];

const successUpdateVerificationCode = [{ ok: 1, code: "234567" }, null];

const accountNotFound = [{ ok: 0, account: null}, null];

const getRandomAccountInfo = () => {
  return [
    { ok: 1,
      account: {
        _id: uuidv4(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        activationCode: "123456",
        createdAt: new Date(),
        attempts: 2,
      }
    },
    null
  ];
};

// ROUTES
const getCreateAccountRoute = () => {
  return "/api/auth/create-account";
};

const getActivateAccountRoute = (id) => {
  return `/api/auth/activate-account/${id}`;
};

// TEST UTILS
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
  successCreateAccountInfo,
  successUpdateVerificationCode,
  accountNotFound,
  getRandomAccountInfo,
  
  getCreateAccountRoute,
  getActivateAccountRoute,

  getValidSignUpInformation,
  getValidVerificationCode,
  getInvalidVerificationCode,
  getMalFormattedVerificationCode,
  getRandomUUID,
  getInvalidUUID,
};