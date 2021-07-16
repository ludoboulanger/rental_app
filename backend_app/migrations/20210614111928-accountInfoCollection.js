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
            "lastModified",
            "attempts",
          ],
          bsonType: "object",
          properties: {
            _id: { bsonType: "string" },
            firstName: { bsonType: "string" },
            lastName: { bsonType: "string" },
            phoneNumber: { bsonType: "string" },
            email: { bsonType: "string" },
            activationCode: { bsonType: "string" },
            lastModified: { bsonType: "date" },
            attempts: { bsonType: "int"}
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