module.exports = {
  async up(db) {
    return db.createCollection("accountInfo", {
      validator: {
        $jsonSchema: {
          required: [
            "firstName",
            "lastName",
            "phoneNumber",
            "activationCode",
            "createdAt",
          ],
          bsonType: "object",
          properties: {
            _id: { bsonType: "string" },
            firstName: { bsonType: "string" },
            lastName: { bsonType: "string" },
            phoneNumber: { bsonType: "string" },
            email: { bsonType: "string" },
            activationCode: { bsonType: "string" },
            createdAt: { bsonType: "date" },
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
