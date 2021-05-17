const express = require('express');
const { getPings, createPing } = require('../../utils/PersistenceMiddleware');

const PingRouter = express.Router();

PingRouter.post('/', createPing);

PingRouter.get('/', getPings);

module.exports = PingRouter;