const express = require("express");
const bcrypt = require("bcrypt");
const { ajv } = require("../schemas/schemas");
const { v4: uuidv4 } = require("uuid");
const { invokeAndSafelyClose } = require("../../services/MongoService");

const SALT_ROUNDS = 10;
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/signup", async (request, response, next) => {
  const body = request.body;
  const validateUser = ajv.getSchema("user");

  if (!validateUser(body)) {
    next("400");
    return;
  }

  const [foundEmail, errorCheckingEmail] = await invokeAndSafelyClose(
    async (client) =>
      client
        .db(process.env.DEV_DB_NAME)
        .collection("users")
        .findOne({ email: body.email })
  );

  if (errorCheckingEmail) {
    next("500");
    return;
  }

  if (foundEmail) {
    next("403");
    return;
  }

  try {
    body.password = await bcrypt.hash(body.password, SALT_ROUNDS);
    body._id = uuidv4();
    body.status = "pending";
    body.activationCode = "";

    const [created, errorCreatingUser] = await invokeAndSafelyClose(
      async (client) =>
        client.db(process.env.DEV_DB_NAME).collection("users").insertOne(body)
    );

    if (errorCreatingUser || created.result.ok !== 1) {
      next("500");
      return;
    }

    response
      .status(201)
      .send({ message: "User Created Successfully", id: created.insertedId });
  } catch (e) {
    next("500");
    return;
  }
});

module.exports = AuthenticationRouter;
