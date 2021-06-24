const express = require("express");
const { validate, version } = require("uuid");
const { ajv } = require("../schemas/schemas");
const AccountInfo = require("../../mongo/AccountInfo");
const GenerateVerificationCode = require("../utils/GenerateVerificationCode");
const { createNewUser } = require("../../mongo/User");

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

      const activationCode = GenerateVerificationCode(6);
      const createdId = await AccountInfo.createNewAccountInfo(
        body,
        activationCode
      );

      await AccountInfo.sendActivationCode(
        body.phoneNumber,
        activationCode
      );

      // TODO Start cron job

      response
        .status(201)
        .send({ message: "Account Created Successfully", id: createdId });

    } catch (e) {
      next("500");
    }
  }
);

AuthenticationRouter.param("accountId", (req, res, next, accountId) => {
  if (validate(accountId) && version(accountId) === 4) {
    req.accountId = accountId;
    next();
  } else {
    next("400");
  }
});

AuthenticationRouter.post(
  "/create-account/validate/:accountId",
  async (req, res) => {
    const accountInfo = await AccountInfo.getAccountInfoById(req.accountId);

    const isApproved = accountInfo.activationCode === req.body.code;

    if (isApproved) {
      // TODO create user and delete account info
      res.status("201").send("validated!");
    } else {
      res.status("400").send("Invalid Code");
    }
  }
);

// ! FOR TESTING -- IF THIS IS PUSHED TELL ME TO REMOVE IT -LB
AuthenticationRouter.post(
  "/create-account/set-password",
  async (req, res) => {
    const createdId = await createNewUser(req.body);

    res.status(201).send({ message: createdId });
  }
);

module.exports = AuthenticationRouter;
