"use strict";

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createCollection("users", {
    validator: {
      $jsonSchema: {
        required: ["firstname", "lastname", "email", "password"],
        bsonType: "object",
        properties: {
          _id: { bsonType: "string", fromat: "uuid" },
          firstname: { bsonType: "string" },
          lastname: { bsonType: "string" },
          email: { bsonType: "string", format: "email" },
          hash: { bsonType: "string" },
        },
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });
};

exports.down = function (db) {
  return db.dropCollection("users");
};

exports._meta = {
  version: 1,
};
