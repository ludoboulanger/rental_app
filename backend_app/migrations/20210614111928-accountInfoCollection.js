module.exports = {
  async up(db) {
    return db.createCollection("accountInfo", {
      validator: {
        $jsonSchema: {
          required: [
            "firstName",
            "lastName",
            "phoneNumber",
            "email",
            "activationCode",
            "lastModified",
            "attempts",
          ],
          bsonType: "object",
          properties: {
            _id: { bsonType: "string" },
            firstName: { bsonType: "string", maxLength: 50 },
            lastName: { bsonType: "string", maxLength: 50 },
            phoneNumber: { bsonType: "string", pattern: "^\\+[1-9]\\d{10,14}$" },
            email: { bsonType: "string", maxLength: 50  },
            activationCode: { bsonType: "string", maxLength: 50, minLength: 50 },
            lastModified: { bsonType: "date" },
            attempts: { bsonType: "int", maximum: 5}
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
