const { ajv } = require("../schemas/schemas");
const express = require("express");
const ListingRouter = express.Router();
const { CODES } = require("../utils/Enums");

ListingRouter.post("/", async (request, response, next) => {
  const body = request.body;
  /*const validator = ajv.getSchema("item");
  if (!validator(body)) {
    return next(CODES.BAD_REQUEST);
  }*/
  response.send(body);



});

module.exports = ListingRouter;
