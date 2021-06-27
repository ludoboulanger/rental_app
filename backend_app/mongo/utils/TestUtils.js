const faker = require("faker");

const randomData = [
  {
    _id: "a81c7926-76b8-432b-9fbe-a6545a395b38",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "4e08ca26-8446-4fbf-9783-709ba1336d47",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "799a2378-ba6f-4fc1-9208-b9128f689ec8",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "17e5c8aa-0f5a-4b62-81b4-f50526c7d102",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
  {
    _id: "e06cd9b2-f5d5-4d34-8873-de0623584097",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    activationCode: "123456",
    lastModified: new Date(),
    attempts: 0,
  },
];

module.exports = {
  randomData,
};