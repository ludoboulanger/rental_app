module.exports = {
  async up(db, client) {
    await client.db(process.env.DB_NAME).collection("accountInfo").createIndex({lastModified: 1}, {expireAfterSeconds: 600});
  },

  async down(db, client) {
    await client.db(process.env.DB_NAME).collection("accountInfo").dropIndex("lastModified_1");
  }
};
