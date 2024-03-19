const express = require('express');

const appointmentRouter = require('./appointment.router');
const careRouter = require('./care.router');
const clientsRouter = require('./clients.router');
const historyRouter = require('./history.router');
const inventoryRouter = require('./inventory.router');
const petsRouter = require('./pets.router');
const reportsRouter = require('./reports.router');
const usersRouter = require('./users.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  // router.use('/appointment', appointmentRouter);
  // router.use('/care', careRouter);
  router.use('/clients', clientsRouter);
  // router.use('/history', historyRouter);
  // router.use('/inventory', inventoryRouter);
  // router.use('/pets', petsRouter);
  // router.use('/reports', reportsRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
