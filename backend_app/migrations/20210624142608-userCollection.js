module.exports = {
  async up(db) {
    return db.createCollection("user", {
      validator: {
        $jsonSchema: {
          required: [
            "firstName",
            "lastName",
            "phoneNumber",
            "email",
            "password"
          ],
          bsonType: "object",
          properties: {
            _id: { bsonType: "string" },
            firstName: { bsonType: "string" },
            lastName: { bsonType: "string" },
            phoneNumber: { bsonType: "string" },
            email: { bsonType: "string" },
            password: { bsonType: "string" }
          },
          additionalProperties: false,
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    });
  },

  async down(db) {
    return db.dropCollection("user");
  }
};
