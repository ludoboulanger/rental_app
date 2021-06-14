const express = require("express");
const { ajv } = require("../schemas/schemas");
const { checkIfEmailExists, insertNewUser } = require("../utils/Persistence");

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", async (request, response, next) => {
  const body = request.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(body)) {
    next("400");
    return;
  }

  const doesEmailExist = await checkIfEmailExists(body.email);

  if (doesEmailExist) {
    next("403");
    return;
  }

  const created = insertNewUser(body);

  response
    .status(201)
    .send({ message: "User Created Successfully", id: created.insertedId });
});

module.exports = AuthenticationRouter;
