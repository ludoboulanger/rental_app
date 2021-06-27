module.exports = {
  async up(db) {

    //Collection that will contain item tags
    //Name must be unique and contain only alphanumerical character or "-"
    await db.createCollection("tags", {
      validator: {
        $jsonSchema: {
          required: ["name"],
          bsonType: "object",
          properties: {
            _id: {bsonType: "objectId"},
            name: {
              bsonType: "string",
              maxLength: 32,
              pattern: "^[0-9a-z\\-]*"
            }
          },
          additionalProperties: false,
        }
      },
    });
    await db.collection("tags").createIndex({"name": 1}, {unique: true});
  },

  async down(db) {
    await db.dropCollection("tags");
  }
};
