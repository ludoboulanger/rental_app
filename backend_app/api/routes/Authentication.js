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

AuthenticationRouter.param("accountId", async (req, res, next, accountId) => {

  if (!validate(accountId) || (version(accountId) !== 4)) {
    next("400");
    return;
  }

  const accountInfo = await AccountInfo.getAccountInfoById(accountId);

  if (!accountInfo) {
    next("404");
    return;
  }

  req.accountInfo = accountInfo;
  next();
});

AuthenticationRouter.post(
  "/create-account/validate/:accountId",
  async (req, res, next) => {

    const isApproved = req.accountInfo.activationCode === req.body.code;

    if (!isApproved) {
      next("400");
    }

    try {
      const createdId = await User.createNewUser(req.accountInfo);
      res.status("201").send({ message: createdId });
    } catch (e) {
      next("500");
    }
  }
);

AuthenticationRouter.put(
  "/create-account/validate/:accountId",
  async ( req, res, next) => {
    try {
      const newActivationCode = GenerateVerificationCode(6);
      const result = await AccountInfo.updateVerificationCode(req.accountInfo._id, newActivationCode);

      if (!result) {
        throw "500";
      }

      res.status("201").send("Success");
    } catch(e) {
      console.log("Error: ", e);
      next("500");
    }
  });

module.exports = AuthenticationRouter;
