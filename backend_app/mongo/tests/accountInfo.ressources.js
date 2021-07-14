const faker = require("faker");
const {v4: uuidv4 } = require("uuid");

const randomData = [
  {
    _id: "a81c7926-76b8-432b-9fbe-a6545a395b38",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: "+9598705151521",
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "4e08ca26-8446-4fbf-9783-709ba1336d47",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: "+1578915461333",
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "799a2378-ba6f-4fc1-9208-b9128f689ec8",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: "+8493847836653",
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "17e5c8aa-0f5a-4b62-81b4-f50526c7d102",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: "+8228580113573",
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "e06cd9b2-f5d5-4d34-8873-de0623584097",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: "+6137634585097",
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
];

const sampleNewDocument = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: "+1446155523869",
  email: faker.internet.email(),
};

const sampleExistingDocument = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: randomData[0].phoneNumber,
  email: faker.internet.email(),
};

const existingPhoneNumber = randomData[3].phoneNumber;

const existingId = randomData[2]._id;

const nonExistingUUID = uuidv4();

const sampleInvalidDocument = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: "NotAValidPhone",
  email: faker.internet.email(),
};

module.exports = {
  randomData,
  sampleNewDocument,
  sampleExistingDocument,
  sampleInvalidDocument,
  existingPhoneNumber,
  existingId,
  nonExistingUUID,
};