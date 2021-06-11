require("dotenv-safe").config();
const express = require("express");
const Database = require("../database/index");
const cors = require("cors");
const AuthenticationRouter = require("./routes/Authentication");
const ErrorHandler = require("./utils/ErrorHandler");

const PORT = 8000;

Database.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use("/api/users", AuthenticationRouter);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
