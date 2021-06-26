const faker = require("faker");
const { v4: uuidv4} = require("uuid");

const userCreatedStub = "9eb7bdc3-fb64-41fe-83da-052febf8b4dd";

const successCreateAccountInfo = {
  ok: 1,
  id: userCreatedStub,
  code: "123456",
};

const successUpdateVerificationCode = {
  ok: 1,
  code: "123456",
};

const getRandomAccountInfo = () => {
  return {
    _id: uuidv4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    activationCode: "123456",
    createdAt: new Date(),
  };
};

module.exports = {
  userCreatedStub,
  successCreateAccountInfo,
  successUpdateVerificationCode,
  getRandomAccountInfo,
};
