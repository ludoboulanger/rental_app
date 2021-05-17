const express = require('express');
const Database = require('../persistence/index');
const PingRouter = require('./routers/PingRouter'); 
const PORT = 3000;

Database.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(express.json());

app.use('/pings', PingRouter);

app.get('/', (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});