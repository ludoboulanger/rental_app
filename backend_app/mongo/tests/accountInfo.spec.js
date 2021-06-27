const { describe, it } = require("mocha");

/**
 * TO TEST:
 *  getAccountInfoById
 *  createAccountInfoById
 *  deleteAccountInfoById
 *  updateVerificationCode
 */
describe("AccountInfo Tests", () => {
  describe("getAccountInfoById sanity checks", () => {
    it("Should get the correct account if in the database", () => {

    });
    
    it("Should return null if the account is not found", () => {

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
