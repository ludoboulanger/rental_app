const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { ajv } = require("../validation/validation");
const { createUser } = require("../utils/persistenceUtils");

const SALT_ROUNDS = 10;
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", (req, res, next) => {
  const newUserData = req.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(newUserData)) {
    // Data invalid, throw error
    const error = new Error("400");
    next(error);
  } else {
    newUserData.userId = uuidv4();
    bcrypt
      .hash(newUserData.password, SALT_ROUNDS)
      .then((hash) => createUser(hash, newUserData))
      .then((created) => res.status(201).send(created))
      .catch(() => {});
  }
  res.status(201).send("Created!");
});

module.exports = AuthenticationRouter;
