const express = require("express");
const bcrypt = require("bcrypt");
const { ajv } = require("../validation/validation");
const { createUser } = require("../utils/persistenceUtils");

const SALT_ROUNDS = 10;
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", async (req, res) => {
  const newUserData = req.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(newUserData)) {
    throw new Error("400");
  }

  try {
    const hash = await bcrypt.hash(newUserData.password, SALT_ROUNDS);
    newUserData.password = hash;
    
    const created = createUser(newUserData);

    res.status(201).send(created);
  } catch (e) {
    throw new Error("500");
  }
  
});

module.exports = AuthenticationRouter;
