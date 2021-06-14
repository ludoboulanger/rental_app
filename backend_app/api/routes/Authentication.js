const express = require("express");
const { ajv } = require("../schemas/schemas");
const Persistence = require("../utils/Persistence");

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", async (request, response, next) => {
  const body = request.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(body)) {
    next("400");
    return;
  }

  const doesEmailExist = await Persistence.checkIfEmailExists(body.email);

  if (doesEmailExist) {
    next("403");
    return;
  }

  const createdId = await Persistence.insertNewUser(body);

  response
    .status(201)
    .send({ message: "User Created Successfully", id: createdId });
});

module.exports = AuthenticationRouter;
