require("dotenv-safe").config();
const express = require("express");
const cors = require("cors");
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
