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
          lastName: "Stark",
          phoneNumber: "8194358738",
          email: "tony@avengers.com",
        };

        const dataMissingLastname = {
          firstName: "Tony",
          phoneNumber: "8194358738",
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
          phoneNumber: "8193451234",
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
          .send(dataMissingPhone)
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
          firstName: 23434,
          lastName: "Stark",
          phoneNumber: "8197432345",
        };

        const invalidLastname = {
          firstName: "Tony",
          lastName: 3255435345,
          phoneNumber: "8197432345",
        };

        const invalidPhone = {
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "",
        };

        const invalidEmail = {
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "8193451234",
          email: "tonyavengers.com",
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
          .send(invalidPhone)
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
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "8194567890",
          email: "tony@avengers.com",
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
          firstName: "Tony",
          lastName: "Stark",
          phoneNumber: "8194567890",
          email: "tony@avengers.com",
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