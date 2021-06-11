const express = require("express");
const bcrypt = require("bcrypt");
const { ajv } = require("../utils/validation/validation");
const { createUser } = require("../utils/PersistenceUtils");

const SALT_ROUNDS = 10;
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", async (req, res, next) => {
  const newUserData = req.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(newUserData)) {
    next("400");
  }

  try {
    const hash = await bcrypt.hash(newUserData.password, SALT_ROUNDS);
    newUserData.password = hash;

    const created = await createUser(newUserData);

    if (created === -1) {
      next("500");
    }

    res.status(201).send("User successfully created");
  } catch (e) {
    next("500");
  }
});

module.exports = AuthenticationRouter;
