const sinon = require("sinon");
const expect = require("chai").expect;
const app = require("../index");
const request = require("supertest");
const AccountInfo = require("../../mongo/AccountInfo");
const User = require("../../mongo/User");
const {
  getRandomAccountInfo,
  userCreatedStub,
  successUpdateVerificationCode,
  successCreateAccountInfo,
  accountNotFound,
  getCreateAccountRoute,
  getActivateAccountRoute,
  getRandomUUID,
  getValidSignUpInformation,
  getValidVerificationCode,
  getInvalidUUID,
  getInvalidVerificationCode,
  getMalFormattedVerificationCode
} = require("./auth.ressources");
const { describe, it, beforeEach, afterEach } = require("mocha");

describe("Server Routes Tests", () => {
  describe("User Authentication Routes", () => {
    describe(`POST ${getCreateAccountRoute()}`, () => {
      let createAccountInfoStub;
      let sendActivationCodeStub;

      beforeEach(() => {
        createAccountInfoStub = sinon
          .stub(AccountInfo, "createNewAccountInfo")
          .returns(successCreateAccountInfo);

        sendActivationCodeStub = sinon
          .stub(AccountInfo, "sendActivationCode")
          .returns(null);
      });

      afterEach(() => {
        createAccountInfoStub.restore();
        sendActivationCodeStub.restore();
      });

      it("Returns 400 on missing data fields", async () => {
        const dataMissingFirstname = {
          lastName: "Stark",
          phoneNumber: "+18194358738",
          email: "tony@avengers.com",
        };

        const dataMissingLastname = {
          firstName: "Tony",
          phoneNumber: "+18194358738",
          email: "tony@avengers.com",
        };

        const dataMissingPhone = {
          firstName: "Tony",
          lastName: "Stark",
          email: "tony@avengers.com",
        };

        const dataMissingEmail = {
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "+18193451234",
        };

        await request(app)
          .post(getCreateAccountRoute())
          .send(dataMissingFirstname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post(getCreateAccountRoute())
          .send(dataMissingLastname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post(getCreateAccountRoute())
          .send(dataMissingPhone)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post(getCreateAccountRoute())
          .send(dataMissingEmail)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });
      });

      it("Returns 400 on improperly formatted data", async () => {
        const invalidFirstname = {
          firstName: 23434,
          lastName: "Stark",
          phoneNumber: "+18197432345",
        };

        const invalidLastname = {
          firstName: "Tony",
          lastName: 3255435345,
          phoneNumber: "+18197432345",
        };

        const invalidPhone = {
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "lol",
        };

        const invalidEmail = {
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "+18193451234",
          email: "tonyavengers.com",
        };

        await request(app)
          .post(getCreateAccountRoute())
          .send(invalidFirstname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post(getCreateAccountRoute())
          .send(invalidLastname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post(getCreateAccountRoute())
          .send(invalidPhone)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post(getCreateAccountRoute())
          .send(invalidEmail)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });
      });

      it("Returns 201 on successful creation", () => {
        const user = {
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "+18194562345",
          email: "tony@avengers.com",
        };

        return request(app)
          .post(getCreateAccountRoute())
          .send(user)
          .expect(201)
          .then(() => {
            expect(createAccountInfoStub.calledOnce).to.be.true;
          });
      });

      it("Returns the id of the new user on successful creation", () => {
        const user = {
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "+18194567890",
          email: "tony@avengers.com",
        };

        return request(app)
          .post(getCreateAccountRoute())
          .send(user)
          .expect(201)
          .then((res) => {
            let resBody = res.body;
            expect(resBody.message).to.eql("Account Created Successfully");
            expect(resBody.id).to.eql("9eb7bdc3-fb64-41fe-83da-052febf8b4dd");
            expect(createAccountInfoStub.calledOnce).to.be.true;
          });
      });
    });

    describe(`POST ${getActivateAccountRoute(":accountId")}`, () => {
      let getAccountInfoByIdStub;
      let createUserStub;
      beforeEach(() => {
        getAccountInfoByIdStub = sinon.stub(AccountInfo, "getAccountInfoById");
        createUserStub = sinon.stub(User, "createNewUser");
      });

      afterEach(() => {
        getAccountInfoByIdStub.restore();
        createUserStub.restore();
      });

      it("Returns 404 if account Id is not found", () => {
        getAccountInfoByIdStub.returns(accountNotFound);

        const accountId = getRandomUUID();
        return request(app)
          .post(getActivateAccountRoute(accountId))
          .send(getValidSignUpInformation())
          .expect(404);
      });

      it("Returns 400 if the request data is malformatted", () => {
        getAccountInfoByIdStub.returns(accountNotFound);
        const accountId = getInvalidUUID();

        return request(app)
          .post(getActivateAccountRoute(accountId))
          .send(getValidVerificationCode())
          .expect(400);
      });

      it("Returns 400 if the code is not parsable as a number", () => {
        getAccountInfoByIdStub.returns(accountNotFound);
        const accountId = getInvalidUUID();

        return request(app)
          .post(getActivateAccountRoute(accountId))
          .send(getMalFormattedVerificationCode())
          .expect(400);
      });

      it("Returns 400 if the validation code recieved is invalid", () => {
        getAccountInfoByIdStub.returns(getRandomAccountInfo());
        const accountId = getRandomUUID();

        return request(app)
          .post(getActivateAccountRoute(accountId))
          .send(getInvalidVerificationCode())
          .expect(400);
      });

      it("Returns 201 on a valid code", () => {
        getAccountInfoByIdStub.returns(getRandomAccountInfo());
        const accountId = getRandomUUID();

        return request(app)
          .post(getActivateAccountRoute(accountId))
          .send(getValidVerificationCode())
          .expect(201);
      });

      it("Returns the created user's Id as a message on valid code", () => {
        getAccountInfoByIdStub.returns(getRandomAccountInfo());
        createUserStub.returns(userCreatedStub);
        const accountId = getRandomUUID();

        return request(app)
          .post(getActivateAccountRoute(accountId))
          .send(getValidVerificationCode())
          .expect(201)
          .then(res => {
            expect(res.body.message).to.eql(userCreatedStub);
          });
      });
    });

    describe(`PUT ${getActivateAccountRoute(":accountId")}`, () => {
      let getAccountInfoByIdStub;
      let updateVerificationCodeStub;
      let sendActivationCodeStub;

      beforeEach(() => {
        getAccountInfoByIdStub = sinon.stub(AccountInfo, "getAccountInfoById");
        updateVerificationCodeStub = sinon.stub(AccountInfo, "updateVerificationCode")
          .returns(successUpdateVerificationCode);
        sendActivationCodeStub = sinon.stub(AccountInfo, "sendActivationCode").returns(null);
      });

      afterEach(() => {
        getAccountInfoByIdStub.restore();
        updateVerificationCodeStub.restore();
        sendActivationCodeStub.restore();
      });

      it("Returns 404 if account is not found", () => {
        getAccountInfoByIdStub.returns(accountNotFound);
        const accountId = getRandomUUID();

        return request(app)
          .put(getActivateAccountRoute(accountId))
          .send({})
          .expect(404);
      });

      it("Returns 400 if the data is malformatted", () => {
        getAccountInfoByIdStub.returns(null);
        const accountId = getInvalidUUID();

        return request(app)
          .put(getActivateAccountRoute(accountId))
          .send({})
          .expect(400);
      });

      it("Returns 201 if code is successfully reset", () => {
        getAccountInfoByIdStub.returns(getRandomAccountInfo());
        const accountId = getRandomUUID();

        return request(app)
          .put(getActivateAccountRoute(accountId))
          .send({})
          .expect(201);
      });
    });
  });
});
