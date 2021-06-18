const express = require("express");
const { validate, version } = require("uuid");
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

      // TODO format should be done on the frontend
      await AccountInfo.sendVerificationCode("+1" + body.phoneNumber);
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

    const validationStatus = await AccountInfo.validateVerificationCode(
      "+1" + accountInfo.phoneNumber,
      req.body.code
    );

    if (validationStatus === "approved") {
      res.status("201").send("validated!");
    } else {
      res.status("400").send("Invalid Code");
    }
  }
);

module.exports = AuthenticationRouter;
