const express = require("express");
const { validate, version } = require("uuid");
const { ajv } = require("../schemas/schemas");
const AccountInfo = require("../../mongo/AccountInfo");
const GenerateVerificationCode = require("../utils/GenerateVerificationCode");
const User = require("../../mongo/User");

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
      await AccountInfo.deleteExistingAccountInfo(body.phoneNumber);

      const activationCode = GenerateVerificationCode(6);
      const createdId = await AccountInfo.createNewAccountInfo(
        body,
        activationCode
      );

      await AccountInfo.sendActivationCode(
        body.phoneNumber,
        activationCode
      );

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
  async (req, res, next) => {
    const accountInfo = await AccountInfo.getAccountInfoById(req.accountId);

    const isApproved = accountInfo.activationCode === req.body.code;

    if (isApproved) {
      try {
        await AccountInfo.deleteExistingAccountInfo(accountInfo.phoneNumber);
        const createdId = await User.createNewUser(accountInfo);
        res.status("201").send({ message: createdId });
      } catch (e) {
        next("500");
      }
    } else {
      res.status("400").send({ message: "Invalid Code" });
    }
  }
);

module.exports = AuthenticationRouter;
