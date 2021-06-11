const UserModel = require("../../database/models/UserModel");

const createUser = (hash, data) => {
  const { userId, name, email } = data;
  const newUser = new UserModel({
    userId,
    name,
    email,
    hash,
  });

  newUser
    .save()
    .then((created) => created)
    .catch(() => -1);
};

module.exports = {
  createUser,
};
