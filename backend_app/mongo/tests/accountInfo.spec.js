require("dotenv-safe").config();
const { describe, it, before, after, beforeEach} = require("mocha");
const { expect } = require("chai");
const { getAccountInfoById, createNewAccountInfo, deleteExistingAccountInfo } = require("../AccountInfo");
const { invokeAndSafelyClose } = require("../Connection");
const { randomData, sampleNewDocument, sampleExistingDocument, sampleInvalidDocument, existingPhoneNumber } = require("./accountInfo.ressources");
const DB_NAME = process.env.DB_NAME;
const COLL_NAME = "accountInfo";

/**
 * * These tests are relatively slow as they interact directly with the DB. Only run them if needed.
 */
describe.only("AccountInfo Tests", () => {

  // Create the collection brefore the tests
  before(async () => {
    await invokeAndSafelyClose(
      async client => client.db(DB_NAME).createCollection(COLL_NAME, {
        validator: {
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
      })
    );
  });

  // Reset the DB between tests to insure independance of tests
  beforeEach(async () => {
    const [, errorDeleting] = await invokeAndSafelyClose(
      async client => client.db(DB_NAME).collection(COLL_NAME).removeMany({})
    );

    const [, errorInserting] =  await invokeAndSafelyClose(
      async client => client.db(DB_NAME).collection(COLL_NAME).insertMany(randomData)
    );

    if (errorDeleting || errorInserting) {
      throw new Error("Error in deleteExistingAccountInfo afterEach");
    }
  });

  // Drop the collection after the tests
  after(async () => {
    await invokeAndSafelyClose(
      async client => client.db(DB_NAME).dropCollection("accountInfo")
    );
  });

  describe("getAccountInfoById sanity checks", () => {

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

    it("Should create the account if not already present in the database", async () => {
      const dataToInsert = sampleNewDocument;

      const [result, error] = await createNewAccountInfo(dataToInsert);

      expect(error).to.be.null;
      expect(result.ok).to.eql(1);
      expect(result).to.haveOwnProperty("id");
      expect(result).to.haveOwnProperty("code");

      const [inserted] = await invokeAndSafelyClose(
        async client => client.db(DB_NAME).collection(COLL_NAME).findOne({phoneNumber: dataToInsert.phoneNumber})
      );

      expect(inserted).to.not.be.null;
    });

    it("Should update the existing account if already present in the database", async () => {

      const dataToInsert = sampleExistingDocument;

      const [result, error] = await createNewAccountInfo(dataToInsert);

      expect(error).to.be.null;
      expect(result.ok).to.eql(1);
      expect(result).to.haveOwnProperty("id");
      expect(result).to.haveOwnProperty("code");

      const [updated] = await invokeAndSafelyClose(
        async client => client.db(DB_NAME).collection(COLL_NAME).findOne({phoneNumber: dataToInsert.phoneNumber})
      );

      expect(updated).to.not.be.null;
      expect(updated.firstName).to.deep.equal(dataToInsert.firstName);
      expect(updated.lastName).to.deep.equal(dataToInsert.lastName);
      expect(updated.phoneNumber).to.deep.equal(dataToInsert.phoneNumber);
      expect(updated.email).to.deep.equal(dataToInsert.email);
    });

    it("Should return a null data object and an error object on Failure", async () => {

      const dataToInsert = sampleInvalidDocument;

      const [result, error] = await createNewAccountInfo(dataToInsert);

      expect(result).to.be.null;
      expect(error).to.not.be.null;
    });

    it("Should not persist data if the document fails validation", async () => {

      const dataToInsert = sampleInvalidDocument;

      await createNewAccountInfo(dataToInsert);

      // Check to see if the document was inserted
      const [result, error] = await invokeAndSafelyClose(
        async client => client.db(DB_NAME).collection(COLL_NAME).findOne({email: sampleInvalidDocument.email})
      );

      expect(error).to.be.null;
      expect(result).to.be.null;

    });
  });

  describe("deleteExistingAccountInfo sanity checks", () => {

    it("Should delete the correct accountInfo if present in the database", async () => {

      const phoneToRemove = existingPhoneNumber;

      const [result, error] = await deleteExistingAccountInfo(phoneToRemove);

      expect(error).to.be.null;
      expect(result).to.haveOwnProperty("ok");

      // Check if the accountInfo was actually removed
      const [removed, errorCheckingRemoved] = await invokeAndSafelyClose(
        async client => client.db(DB_NAME).collection(COLL_NAME).findOne({phoneNumber: phoneToRemove})
      );

      expect(errorCheckingRemoved).to.be.null;
      expect(removed).to.be.null;

    });

    it("Should return ok = 1 on successful delete", async () => {

      const phoneToRemove = existingPhoneNumber;

      const [result, error] = await deleteExistingAccountInfo(phoneToRemove);

      expect(error).to.be.null;
      expect(result.ok).to.eql(1);
    });

    it("Should return ok = 0 if the phone number is not found in the database", async () => {
      const phoneToRemove = "+19999999999";

      const [result, error] = await deleteExistingAccountInfo(phoneToRemove);

      expect(error).to.be.null;
      expect(result.ok).to.eql(0);

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
