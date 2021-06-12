const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

const createUser = async (data) => {
  const { firstname, lastname, email, password } = data;
  console.log("Firstname: ", firstname);
  console.log("lastname: ", lastname);
  console.log("email: ", email);
  console.log("password: ", password);
  const newUser = new UserModel({
    _id: uuidv4(),
    firstname,
    lastname,
    email,
    password,
  });
  console.log("New User data:", newUser);

  try {
    const savedInstance = await newUser.save();
    return savedInstance;
  } catch (e) {
    return -1;
  }
};

const checkIfUserExists = async (email) => {
  const foundUsers = await UserModel.find({ email: email }).exec();
  console.log(foundUsers);
  if (_.isEmpty(foundUsers)) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  createUser,
  checkIfUserExists,
};
