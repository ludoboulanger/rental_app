const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");

const createUser = async (data) => {
  const { firstname, lastname, email, password } = data;
  const newUser = new UserModel({
    _id: uuidv4(),
    firstname,
    lastname,
    email,
    password,
  });

  try {
    const savedInstance = await newUser.save();
    return savedInstance;
  } catch (e) {
    return -1;
  }
};

const checkIfUserExists = async (email) => {
  return UserModel.exists({ email: email });
};

module.exports = {
  createUser,
  checkIfUserExists,
};
