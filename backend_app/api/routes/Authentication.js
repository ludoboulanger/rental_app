const express = require("express");
const { validate, version } = require("uuid");
const { ajv } = require("../schemas/schemas");
const AccountInfo = require("../../mongo/AccountInfo");
const User = require("../../mongo/User");
const { CODES } = require("../utils/Enums");

const AuthenticationRouter = express.Router();

AuthenticationRouter.post(
  "/create-account",
  async (request, response, next) => {
    const body = request.body;
    const validateAccountInfo = ajv.getSchema("accountInfo");
    if (!validateAccountInfo(body)) {
      next(CODES.BAD_REQUEST);
      return;
    }

    try {
      await AccountInfo.deleteExistingAccountInfo(body.phoneNumber);

      const result = await AccountInfo.createNewAccountInfo(body);

      if (!result.ok) {
        next(CODES.INTERNAL_ERROR);
        return;
      }

      await AccountInfo.sendActivationCode(
        body.phoneNumber,
        result.code
      );

      response
        .status(CODES.CREATED)
        .send({ message: "Account Created Successfully", id: result.id });

    } catch (e) {
      next(CODES.INTERNAL_ERROR);
    }
  }
);

AuthenticationRouter.param("accountId", async (req, res, next, accountId) => {

  if (!validate(accountId) || (version(accountId) !== 4)) {
    next(CODES.BAD_REQUEST);
    return;
  }

  const accountInfo = await AccountInfo.getAccountInfoById(accountId);

  if (!accountInfo) {
    next(CODES.NOT_FOUND);
    return;
  }

  req.accountInfo = accountInfo;
  next();
});

AuthenticationRouter.post(
  "/activate-account/:accountId",
  async (req, res, next) => {

    const isApproved = req.accountInfo.activationCode === req.body.code;

    if (!isApproved) {
      next(CODES.BAD_REQUEST);
    }

    try {
      const createdId = await User.createNewUser(req.accountInfo);
      res.status(CODES.CREATED).send({ message: createdId });
    } catch (e) {
      next(CODES.INTERNAL_ERROR);
    }
  }
);

AuthenticationRouter.put(
  "/activate-account/:accountId",
  async ( req, res, next) => {
    try {
      const result = await AccountInfo.updateVerificationCode(req.accountInfo._id);

      if (!result.ok) {
        next(CODES.INTERNAL_ERROR);
      }


      await AccountInfo.sendActivationCode(
        req.accountInfo.phoneNumber,
        result.code
      );

      res.status(CODES.CREATED).send("Success");
    } catch(e) {
      next(CODES.INTERNAL_ERROR);
    }
  });

module.exports = AuthenticationRouter;
