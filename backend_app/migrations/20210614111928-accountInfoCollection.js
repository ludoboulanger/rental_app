module.exports = {
  async up(db) {
    return db.createCollection("accountInfo", {
      validator: {
        $jsonSchema: {
          required: [
            "firstname",
            "lastname",
            "phoneNumber",
            "isActive",
            "activationCode",
          ],
          bsonType: "object",
          properties: {
            _id: { bsonType: "string" },
            firstname: { bsonType: "string" },
            lastname: { bsonType: "string" },
            phoneNumber: { bsonType: "string" },
            isActive: { bsonType: "bool" },
            activationCode: { bsonType: "string" },
          },
          additionalProperties: false,
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    });
  },

  async down(db) {
    return db.dropCollection("accountInfo");
  },
};
