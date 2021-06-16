const sinon = require("sinon");
const expect = require("chai").expect;
const app = require("../index");
const request = require("supertest");
const AccountInfo = require("../../mongo/AccountInfo");
const { userCreatedStub } = require("./DatabaseMock");
const { describe, it, beforeEach, afterEach } = require("mocha");

describe("Server Routes Tests", () => {
  describe("User Authentication Routes", () => {
    describe("User Sign up", () => {
      let createUserStub;

      beforeEach(() => {
        createUserStub = sinon
          .stub(AccountInfo, "createNewAccountInfo")
          .returns(userCreatedStub);
      });

      afterEach(() => {
        createUserStub.restore();
      });

      it("Returns 400 on missing data fields", async () => {
        const dataMissingFirstname = {
          lastname: "Stark",
          email: "stark@avengers.com",
        };

        const dataMissingLastname = {
          firstname: "Tony",
          email: "stark@avengers.com",
        };

        const dataMissingEmail = {
          firstname: "Tony",
          lastname: "Stark",
        };

        await request(app)
          .post("/api/users/create-account")
          .send(dataMissingFirstname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/create-account")
          .send(dataMissingLastname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/create-account")
          .send(dataMissingEmail)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });
      });

      it("Returns 400 on improperly formatted data", async () => {
        const invalidFirstname = {
          firstname: 23434,
          lastname: "Stark",
          email: "stark@avengers.com",
        };

        const invalidLastname = {
          firstname: "Tony",
          lastname: 3255435345,
          email: "stark@avengers.com",
        };

        const invalidEmail = {
          firstname: "Tony",
          lastname: "Stark",
          email: "starkavengerscom",
        };

        await request(app)
          .post("/api/users/create-account")
          .send(invalidFirstname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/create-account")
          .send(invalidLastname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/create-account")
          .send(invalidEmail)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });
      });

      it("Returns 201 on successful creation", async () => {
        const user = {
          firstname: "Tony",
          lastname: "Stark",
          email: "stark@avengers.com",
        };

        await request(app)
          .post("/api/users/create-account")
          .send(user)
          .expect(201)
          .then(() => {
            expect(createUserStub.calledOnce).to.be.true;
          });
      });

      it("Returns the id of the new user on successful creation", async () => {
        const user = {
          firstname: "Tony",
          lastname: "Stark",
          email: "stark@avengers.com",
        };

        await request(app)
          .post("/api/users/create-account")
          .send(user)
          .expect(201)
          .then((res) => {
            let resBody = res.body;
            expect(resBody.message).to.eql("Account Created Successfully");
            expect(resBody.id).to.eql("9eb7bdc3-fb64-41fe-83da-052febf8b4dd");
            expect(createUserStub.calledOnce).to.be.true;
          });
      });
    });
  });
});
