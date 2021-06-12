const express = require("express");
const bcrypt = require("bcrypt");
const { ajv } = require("../validation/validation");
const DBUtils = require("../../database/utils/PersistenceUtils");

const SALT_ROUNDS = 10;
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", async (req, res, next) => {
  const newUserData = req.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(newUserData)) {
    next("400");
    return;
  }

  const userAlreadyExists = await DBUtils.checkIfUserExists(newUserData.email);

  if (userAlreadyExists) {
    next("403");
    return;
  }

  try {
    const hash = await bcrypt.hash(newUserData.password, SALT_ROUNDS);
    newUserData.password = hash;

    const created = await DBUtils.createUser(newUserData);

    if (created === -1) {
      next("500");
      return;
    }

    res
      .status(201)
      .send({ message: "User Created Successfully", id: created._id });
  } catch (e) {
    next("500");
    return;
  }
});

module.exports = AuthenticationRouter;
