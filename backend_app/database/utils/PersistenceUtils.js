const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");

const createUser = (data) => {
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

  return newUser
    .save()
    .then((created) => created)
    .catch(() => -1);
};

module.exports = {
  createUser,
};
