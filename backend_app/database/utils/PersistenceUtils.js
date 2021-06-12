const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");

const createUser = async (data) => {
  const newUser = new UserModel({
    _id: uuidv4(),
    ...data,
  });

  try {
    return newUser.save();
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
