const { invokeAndSafelyClose } = require("../mongo/Connection");

module.exports = {
  async up() {
    const [result, error] = await invokeAndSafelyClose(
      client => client.db("rentalDevDB").collection("accountInfo").createIndex({createdAt: 1}, {expireAfterSeconds: 36000})
    );

    if (error) {
      throw "Cant migrate up. Error creating accountInfoExpiry index";
    }

    return result;
  },

  async down() {
    const [result, error] = await invokeAndSafelyClose(
      client => client.db("rentalDevDB").collection("accountInfo").dropIndex("createdAt_1")
    );

    if (error) {
      throw "Cant migrate down. Error dropping accountInfoExpiry index";
    }

    return result;
  }
};
