const { invokeAndSafelyClose } = require("../mongo/Connection");

module.exports = {
  async up() {
    const [result, error] = await invokeAndSafelyClose(
      client => client.db("rentalDevDB").collection("accountInfo").createIndex({lastModified: 1}, {expireAfterSeconds: 600}) // Account expires after 10mins
    );

    if (error) {
      throw "Cant migrate up. Error creating accountInfoExpiry index";
    }

    return result;
  },

  async down() {
    const [result, error] = await invokeAndSafelyClose(
      client => client.db("rentalDevDB").collection("accountInfo").dropIndex("lastModified_1")
    );

    if (error) {
      throw "Cant migrate down. Error dropping accountInfoExpiry index";
    }

    return result;
  }
};
