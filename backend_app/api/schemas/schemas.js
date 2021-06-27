const Ajv = require("ajv");
const accountInfoSchema = require("./accountInfo.json");
const userSchema = require("./user.json");
const ajv = (exports.ajv = new Ajv());

// Add all schemas here
ajv.addSchema(accountInfoSchema, "accountInfo");
ajv.addSchema(userSchema, "user");