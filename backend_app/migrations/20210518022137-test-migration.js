"use strict";

let dbm;
// eslint-disable-next-line no-unused-vars
var type;
// eslint-disable-next-line no-unused-vars
var seed;

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
  return db.insert("testCollection", [{
    name: "Ludo",
    skill: "Express.js"
  },
  {
    name: "Mauri",
    skill: "Soif d'apprentissage"
  },
  {
    name: "Vic",
    skill: "Joli sourire"
  }]);
};

exports.down = function (db) {
  return db.dropCollection("testCollection");
};

exports._meta = {
  "version": 1
};
