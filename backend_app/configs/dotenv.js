//Config for dotenv library

require("dotenv-safe").config({
  example: process.env.CI ? ".env.ci.example" : ".env.example"
});
