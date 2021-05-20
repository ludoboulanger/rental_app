const express = require('express');
const Database = require('../database/index');
const cors = require('cors')
const PORT = 8000;

Database.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
