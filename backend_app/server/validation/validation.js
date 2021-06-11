const Ajv = require("ajv");
const userSchema = require("./userSchema.json");
const ajv = (exports.ajv = new Ajv());

// Add all schemas here
ajv.addSchema(userSchema, "user");
