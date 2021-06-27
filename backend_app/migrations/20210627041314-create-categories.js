module.exports = {
  async up(db) {

    //Will use https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-materialized-paths/

    await db.createCollection("items-categories", {
      validator: {
        $jsonSchema: {
          required: ["name"],
          bsonType: "object",
          properties: {
            _id: {bsonType: "objectId"},
            name: {
              bsonType: "string",
              maxLength: 50,
            },
            path: {
              bsonType: ["string", "null"],
              pattern: "^,([^,]+,)+$"
            }
          },
          additionalProperties: false,
        }
      },
    });
    await db.collection("items-categories").createIndex({"name": 1}, {unique: true});
    await db.collection("items-categories").insertMany([
      {name: "Sport", path: null},
      {name: "Tool", path: null},
      {name: "Entertainment", path: null}
    ]);
  },

  async down(db) {
    await db.dropCollection("items-categories");
  }
};
