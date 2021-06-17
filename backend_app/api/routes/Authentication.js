const express = require("express");
const { ajv } = require("../schemas/schemas");
const AccountInfo = require("../../mongo/AccountInfo");

const AuthenticationRouter = express.Router();

AuthenticationRouter.post(
  "/create-account",
  async (request, response, next) => {
    const body = request.body;
    const validateAccountInfo = ajv.getSchema("accountInfo");

    if (!validateAccountInfo(body)) {
      next("400");
      return;
    }

    try {
      
      await AccountInfo.deleteExistingAccountInfoIfNeeded(body.phoneNumber);
      
      const createdId = await AccountInfo.createNewAccountInfo(body);
      
      response
        .status(201)
        .send({ message: "Account Created Successfully", id: createdId });

    } catch (e) {
      next("500");
    }
  }
);

module.exports = AuthenticationRouter;
