const express = require("express");
const bcrypt = require("bcrypt");
const { ajv } = require("../schemas/schemas");
// const DBUtils = require("../../database/utils/PersistenceUtils");

const SALT_ROUNDS = 10;
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", async (request, response, next) => {
  const body = request.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(body)) {
    next("400");
    return;
  }

  // const userAlreadyExists = await DBUtils.checkIfUserExists(body.email);

  // if (userAlreadyExists) {
  //   next("403");
  //   return;
  // }

  try {
    body.password = await bcrypt.hash(body.password, SALT_ROUNDS);

    // const created = await DBUtils.createUser(body);

    // if (created === -1) {
    //   next("500");
    //   return;
    // }

    response
      .status(201)
      .send({ message: "User Created Successfully", id: "created._id" });
  } catch (e) {
    next("500");
    return;
  }
});

module.exports = AuthenticationRouter;
