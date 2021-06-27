module.exports = {
  async up(db) {

    let validator = (await db.listCollections({name: "user"}).toArray())[0].options.validator;

    validator.$jsonSchema.properties.listings = {bsonType:"array", items: {bsonType: "objectId"}};

    await db.command({
      collMod: "user",
      validator: validator,
    });

  },

  async down(db) {
    let validator = (await db.listCollections({name: "user"}).toArray())[0].options.validator;

    delete validator.$jsonSchema.properties.listings;

    await db.command({
      collMod: "user",
      validator: validator,
    });
  }
};
