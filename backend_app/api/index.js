require("dotenv-safe").config();
const express = require("express");
const cors = require("cors");
const AuthenticationRouter = require("./routes/Authentication");
const ErrorHandler = require("./utils/ErrorHandler");
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use("/api/users", AuthenticationRouter);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;