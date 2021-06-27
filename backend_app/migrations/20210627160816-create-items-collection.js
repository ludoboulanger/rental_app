module.exports = {
  async up(db) {
    await db.createCollection("items", {
      validator: {
        $jsonSchema: {
          required: ["name", "category", "location", "price"],
          bsonType: "object",
          properties: {
            _id: {bsonType: "objectId"},
            name: {
              bsonType: "string",
              maxLength: 50,
            },
            description: {
              bsonType: "string",
              maxLength: 1000
            },
            category: {
              bsonType: "objectId"
            },
            tags : {
              bsonType: "array",
              items: {
                bsonType: "objectId"
              }
            },
            price: {
              bsonType: "object"
            },
            location: {
              bsonType: "object"
            },
            pictures: {
              bsonType: "array",
              items: {
                bsonType: "string"
              }
            }
          },
          additionalProperties: false,
        }
      },
    });
  },

  async down(db) {
    await db.dropCollection("items");
  }
};
