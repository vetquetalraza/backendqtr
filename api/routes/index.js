const express = require('express');

const clientsRouter = require('./clients.router');
const petsRouter = require('./pets.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/clients', clientsRouter);
  router.use('/pets', petsRouter);
}

module.exports = routerApi;
