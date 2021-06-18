const express = require("express");
const { validate, version } = require("uuid");
const { ajv } = require("../schemas/schemas");
const AccountInfo = require("../../mongo/AccountInfo");
const GenerateVerificationCode = require("../utils/GenerateVerificationCode");

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

      response
        .status(201)
        .send({ message: "Account Created Successfully", id: createdId });

      // TODO format should be done on the frontend
      await AccountInfo.sendActivationCode(
        "+1" + body.phoneNumber,
        activationCode
      );
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
      res.status("201").send("validated!");
    } else {
      res.status("400").send("Invalid Code");
    }
  }
);

module.exports = AuthenticationRouter;
