const { ajv } = require("../schemas/schemas");
const express = require("express");
const ListingRouter = express.Router();
const { CODES } = require("../utils/Enums");

ListingRouter.post("/", async (request, response, next) => {
  const body = request.body;
  //TODO RENT-54 Implement api
  response.send(body);
});

module.exports = ListingRouter;
