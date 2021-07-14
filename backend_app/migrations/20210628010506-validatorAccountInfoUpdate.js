module.exports = {
  async up(db) {

    return db.command({
      collMod: "accountInfo",
      validator:  {
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
            activationCode: { bsonType: "string", maxLength: 6, minLength: 6 },
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
    return db.command({
      collMod: "accountInfo",
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
  }
};
