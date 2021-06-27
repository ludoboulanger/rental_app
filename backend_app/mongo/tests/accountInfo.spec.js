require("dotenv-safe").config();
const { describe, it, before, after } = require("mocha");
const { expect } = require("chai");
const { getAccountInfoById } = require("../AccountInfo");
const { invokeAndSafelyClose } = require("../Connection");
const { randomData } = require("../utils/TestUtils");
const DB_NAME = process.env.DB_NAME;
const COLL_NAME = "accountInfo";

/**
 * TO TEST:
 *  getAccountInfoById
 *  createAccountInfoById
 *  deleteAccountInfoById
 *  updateVerificationCode
 */
describe("AccountInfo Tests", () => {

  describe.only("getAccountInfoById sanity checks", () => {

    before(async () => {
      const [, error] =  await invokeAndSafelyClose(
        async client => client.db(DB_NAME).collection(COLL_NAME).insertMany(randomData)
      );
      
      if (error) {
        throw new Error("Error inserting AccountInfo documents");
      }
    });

    after(async () => {
      const [, error] = await invokeAndSafelyClose(
        async client => client.db(DB_NAME).collection(COLL_NAME).removeMany({})
      );

      if (error) {
        throw new Error("Error Clearing AccountInfo");
      }
    });

    it("Should get the correct account if in the database", async () => {

      const [account, error] = await getAccountInfoById("17e5c8aa-0f5a-4b62-81b4-f50526c7d102");

      expect(error).to.be.null;
      expect(account).to.not.be.null;

      expect(account._id).to.eql("17e5c8aa-0f5a-4b62-81b4-f50526c7d102");
      expect(account).to.haveOwnProperty("firstName");
      expect(account).to.haveOwnProperty("lastName");
      expect(account).to.haveOwnProperty("phoneNumber");
      expect(account).to.haveOwnProperty("email");
      expect(account).to.haveOwnProperty("attempts");
      expect(account).to.haveOwnProperty("activationCode");
      expect(account).to.haveOwnProperty("lastModified");

    });
    
    it("Should return null if the account is not found", async () => {

      const [account, error] = await getAccountInfoById("c3893e37-975b-4ffc-8a08-497fb0b6321b");

      expect(error).to.be.null;
      expect(account).to.be.null;

    });

    it("Should not throw error on invalid uuid", async () => {
      expect(async () => await getAccountInfoById("notAnId")).to.not.throw();
    });
  });

  describe("createNewAccountInfo sanity checks", () => {
    it("Should create the account if not already present in the database", () => {

    });

    it("Should update the existing account if not already present in the database", () => {

    });

    it("Should return a result with ok = 1, the createdId and the code on Success", () => {

    });

    it("Should return a result with ok = 0 on Failure", () => {

    });

    it("Should not persist data if the document fails validation", () => {

    });
  });

  describe("deleteExistingAccountInfo sanity checks", () => {
    it("Should delete the correct accountInfo if present in the database", () => {

    });

    it("Should return ok = 1 on successful delete", () => {

    });

    it("Should not delete if the phone number is not found in the database", () => {

    });

    it("Should return ok = 0 on failed deletion", () => {

    });
  });

  describe("updateVerificationCode sanity checks", () => {
    it("Should correctly update the verification code for the account if found", () => {

    });

    it("Should return ok = 1 and the new code on success", () => {

    });

    it("Should not persist any changes if account if not found", () => {

    });

    it("Should return ok = 0 and a null code on failure", () => {

    });
  });

  describe("incrementAttemptsForAccount sanity checks", () => {
    it("Should correctly increment the attempts by 1 on success", () => {

    });

    it("Should return ok = 1 on success", () => {

    });

    it("Should not persist any changes if account if not found", () => {

    });

    it("Should return ok = 0 on failure", () => {

    });
  });
});
