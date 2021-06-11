const UserModel = require("../../database/models/UserModel");

const createUser = (data) => {
  const newUser = new UserModel(data);

  newUser
    .save()
    .then((created) => created)
    .catch(() => {
      throw new Error("500");
    });
};

module.exports = {
  createUser,
};
