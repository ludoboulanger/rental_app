module.exports = {
  async up(db) {
    return db.createCollection("users", {
      validator: {
        $jsonSchema: {
          required: [
            "firstname",
            "lastname",
            "email",
            "password",
            "status",
            "activationCode",
          ],
          bsonType: "object",
          properties: {
            _id: { bsonType: "string" },
            firstname: { bsonType: "string" },
            lastname: { bsonType: "string" },
            email: { bsonType: "string" },
            password: { bsonType: "string" },
            status: { type: "string", enum: ["pending", "active"] },
            activationCode: { type: "string" },
          },
        },
      },
      validationLevel: "strict",
      validationAction: "error",
    });
  },

  async down(db) {
    return db.dropCollection("users");
  },
};
