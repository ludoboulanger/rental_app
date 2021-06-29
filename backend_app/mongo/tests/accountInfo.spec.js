require("dotenv-safe").config();
const { describe, it, before, after, beforeEach} = require("mocha");
const { expect } = require("chai");
const { getAccountInfoById, createNewAccountInfo, deleteExistingAccountInfo, updateVerificationCode, incrementAttemptsForAccount } = require("../AccountInfo");
const { invokeAndSafelyClose } = require("../Connection");
const { randomData, sampleNewDocument, sampleExistingDocument, sampleInvalidDocument, existingPhoneNumber, existingId, nonExistingUUID } = require("./accountInfo.ressources");
const _ = require("lodash");
const DB_NAME = process.env.DB_NAME;
const COLL_NAME = "accountInfo";

describe("AccountInfo Tests", () => {
  // Create the collection before the tests
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

      const [result, error] = await getAccountInfoById("17e5c8aa-0f5a-4b62-81b4-f50526c7d102");

      expect(error).to.be.null;
      expect(result.ok).to.eql(1);

      expect(result.account._id).to.eql("17e5c8aa-0f5a-4b62-81b4-f50526c7d102");
      expect(result.account).to.haveOwnProperty("firstName");
      expect(result.account).to.haveOwnProperty("lastName");
      expect(result.account).to.haveOwnProperty("phoneNumber");
      expect(result.account).to.haveOwnProperty("email");
      expect(result.account).to.haveOwnProperty("attempts");
      expect(result.account).to.haveOwnProperty("activationCode");
      expect(result.account).to.haveOwnProperty("lastModified");

    });
    
    it("Should return null if the account is not found", async () => {

      const [result, error] = await getAccountInfoById("c3893e37-975b-4ffc-8a08-497fb0b6321b");

      expect(error).to.be.null;
      expect(result.ok).to.eql(0);

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
    it("Should correctly update the verification code for the account if found", async () => {
      const accountToUpdate = existingId;

      const [result, error] = await updateVerificationCode(accountToUpdate);

      expect(result.ok).to.eql(1);
      expect(error).to.be.null;

      // Check to see if the new Code was persisted
      const [updated, err] = await invokeAndSafelyClose(
        async client => client.db(DB_NAME).collection(COLL_NAME).findOne({_id: accountToUpdate})
      );

      expect(err).to.be.null;
      expect(updated.activationCode).to.not.eql(randomData[2].activationCode);
    });

    it("Should return ok = 1 and the new code on success", async () => {
      const accountToUpdate = existingId;

      const [result, error] = await updateVerificationCode(accountToUpdate);

      expect(result.ok).to.eql(1);
      expect(result).to.haveOwnProperty("code");
      expect(error).to.be.null;

    });

    it("Should return ok = 0 if account if not found", async () => {
      const accountToUpdate = nonExistingUUID;

      const [result, error] = await updateVerificationCode(accountToUpdate);

      expect(result.ok).to.eql(0);
      expect(result).to.haveOwnProperty("newCode");
      expect(error).to.be.null;
    });
  });

  describe("incrementAttemptsForAccount sanity checks", () => {
    it("Should correctly increment the attempts by 1 on success", async () => {

      const accountInfoToUpdate = randomData[4];

      const [result, error] = await incrementAttemptsForAccount(accountInfoToUpdate._id);

      expect(error).to.be.null;
      expect(result).to.haveOwnProperty("ok");

      //Check that the attempts were actually incremented
      const [updated, err] = await invokeAndSafelyClose(
        client => client.db(DB_NAME).collection(COLL_NAME).findOne({_id: accountInfoToUpdate._id})
      );

      expect(err).to.be.null;
      expect(updated.attempts).to.eql(1);

    });

    it("Should return ok = 1 on success", async () => {
      const accountInfoToUpdate = randomData[4];

      const [result, error] = await incrementAttemptsForAccount(accountInfoToUpdate._id);

      expect(error).to.be.null;
      expect(result.ok).to.eql(1);

    });

    it("Should return ok = 0 on failure", async () => {

      const invalidID = nonExistingUUID;

      const [result, error] = await incrementAttemptsForAccount(invalidID);

      expect(error).to.be.null;
      expect(result.ok).to.eql(0);

    });
  });
});
