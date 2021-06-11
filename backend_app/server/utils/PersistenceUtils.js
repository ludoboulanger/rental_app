const UserModel = require("../../database/models/UserModel");

const createUser = (data) => {
  const newUser = new UserModel(data);

  return newUser
    .save()
    .then((created) => created)
    .catch(() => -1);
};

module.exports = {
  createUser,
};
