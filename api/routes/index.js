const express = require('express');

const appointmentRouter = require('./appointment.router');
const batchRouter = require('./batch.router');
const careRouter = require('./care.router');
const clientsRouter = require('./clients.router');
const diagnosisRouter = require('./diagnosis.router');
const drugsRouter = require('./drugs.router');
const groomingRouter = require('./grooming.router');
const historyRouter = require('./history.router');
const inventoryRouter = require('./inventory.router');
const medicalsRouter = require('./medicals.router');
const medicinesRouter = require('./medicines.router');
const planRouter = require('./plan.router');
const petsRouter = require('./pets.router');
const reportsRouter = require('./reports.router');
const symptomsRouter = require('./symptoms.router');
const usersRouter = require('./users.router');
const vaccinesRouter = require('./vaccines.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/appointments', appointmentRouter);
  router.use('/batch', batchRouter);
  router.use('/care', careRouter);
  router.use('/clients', clientsRouter);
  router.use('/diagnosis', diagnosisRouter);
  router.use('/drugs', drugsRouter);
  router.use('/grooming', groomingRouter);
  router.use('/history', historyRouter);
  // router.use('/inventory', inventoryRouter);
  router.use('/login', usersRouter);
  router.use('/medical', medicalsRouter);
  router.use('/medicines', medicinesRouter);
  router.use('/plan', planRouter);
  router.use('/pets', petsRouter);
  router.use('/symptoms', symptomsRouter);
  router.use('/users', usersRouter);
  router.use('/vaccines', vaccinesRouter);
}

module.exports = routerApi;
