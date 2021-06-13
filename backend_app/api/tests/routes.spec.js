const sinon = require("sinon");
const expect = require("chai").expect;
const app = require("../index");
const request = require("supertest");
const DBUtils = require("../../database/utils/PersistenceUtils");
const { userCreatedStub } = require("./DatabaseMock");
const { describe, it, beforeEach, afterEach } = require("mocha");

describe("Server Routes Tests", () => {
  describe("User Authentication Routes", () => {
    describe("User Sign up", () => {
      let createUserStub;
      let checkIfUserExistsStub;

      beforeEach(() => {
        createUserStub = sinon
          .stub(DBUtils, "createUser")
          .returns(userCreatedStub);

        checkIfUserExistsStub = sinon.stub(DBUtils, "checkIfUserExists");
      });

      afterEach(() => {
        createUserStub.restore();
        checkIfUserExistsStub.restore();
      });

      it("Returns 400 on missing data fields", async () => {
        const dataMissingFirstname = {
          lastname: "Stark",
          email: "stark@avengers.com",
          password: "Password1!",
        };

        const dataMissingLastname = {
          firstname: "Tony",
          email: "stark@avengers.com",
          password: "Password1!",
        };

        const dataMissingEmail = {
          firstname: "Tony",
          lastname: "Stark",
          password: "Password1!",
        };

        const dataMissingPassword = {
          firstname: "Tony",
          lastname: "Stark",
          email: "stark@avengers.com",
        };

        await request(app)
          .post("/api/users/signup")
          .send(dataMissingFirstname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/signup")
          .send(dataMissingLastname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/signup")
          .send(dataMissingEmail)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/signup")
          .send(dataMissingPassword)
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
          password: "Password1!",
        };

        const invalidLastname = {
          firstname: "Tony",
          lastname: 3255435345,
          email: "stark@avengers.com",
          password: "Password1!",
        };

        const invalidEmail = {
          firstname: "Tony",
          lastname: "Stark",
          email: "starkavengerscom",
          password: "Password1!",
        };

        const invalidPassword = {
          firstname: "Tony",
          lastname: "stark",
          email: "stark@avengers.com",
          password:
            "fnjkdsl bverkFDLGM;KLFDGKDFHKMGDFKLHMFGKLHMGFKHMKFGHKGFKHKLGFHLKGFMehtrgjkdfgh j;iuretiorjghiurehti rjguer'waekpfao]rwOPEJTOIJRIOTEJRPOGHREUIHYORERJOIRHGROIEKRO REITEIJEWHTUQTEWHUIEH7 3Y578B34635U79805U69 6895YU-69",
        };

        await request(app)
          .post("/api/users/signup")
          .send(invalidFirstname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/signup")
          .send(invalidLastname)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/signup")
          .send(invalidEmail)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });

        await request(app)
          .post("/api/users/signup")
          .send(invalidPassword)
          .expect(400)
          .then((res) => {
            expect(res.body.message).to.be.eql("Invalid Request");
          });
      });

      it("Returns 403 if user already exists in the database", async () => {
        checkIfUserExistsStub.returns(true);
        const user = {
          firstname: "Tony",
          lastname: "Stark",
          email: "stark@avengers.com",
          password: "Password1!",
        };

        await request(app)
          .post("/api/users/signup")
          .send(user)
          .expect(403)
          .then((res) => {
            expect(res.body.message).to.eql("Action Forbidden");
            expect(checkIfUserExistsStub.calledOnce).to.be.true;
          });
      });

      it("Returns 201 on successful creation", async () => {
        checkIfUserExistsStub.returns(false);

        const user = {
          firstname: "Tony",
          lastname: "Stark",
          email: "stark@avengers.com",
          password: "Password1!",
        };

        await request(app)
          .post("/api/users/signup")
          .send(user)
          .expect(201)
          .then(() => {
            expect(checkIfUserExistsStub.calledOnce).to.be.true;
            expect(createUserStub.calledOnce).to.be.true;
          });
      });

      it("Returns the id of the new user on successful creation", async () => {
        checkIfUserExistsStub.returns(false);

        const user = {
          firstname: "Tony",
          lastname: "Stark",
          email: "stark@avengers.com",
          password: "Password1!",
        };

        await request(app)
          .post("/api/users/signup")
          .send(user)
          .expect(201)
          .then((res) => {
            let resBody = res.body;
            expect(resBody.message).to.eql("User Created Successfully");
            expect(resBody.id).to.eql("9eb7bdc3-fb64-41fe-83da-052febf8b4dd");
            expect(checkIfUserExistsStub.calledOnce).to.be.true;
            expect(createUserStub.calledOnce).to.be.true;
          });
      });
    });
  });
});
