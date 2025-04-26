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
const authMiddleware = require('../middlewares/authMiddleware');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); //el resto de rutas
  router.use('/appointments',authMiddleware, appointmentRouter);
  router.use('/batch', authMiddleware,batchRouter);
  router.use('/care', authMiddleware,careRouter);
  router.use('/clients', authMiddleware,clientsRouter);
  router.use('/diagnosis', authMiddleware,diagnosisRouter);
  router.use('/drugs', authMiddleware,drugsRouter);
  router.use('/grooming', authMiddleware,groomingRouter);
  router.use('/history', authMiddleware,historyRouter);
  // router.use('/inventory', inventoryRouter);
  //router.use('/login', usersRouter);
  router.use('/medical',authMiddleware, medicalsRouter);
  router.use('/medicines', authMiddleware,medicinesRouter);
  router.use('/plan', authMiddleware,planRouter);
  router.use('/pets', authMiddleware,petsRouter);
  router.use('/symptoms', authMiddleware,symptomsRouter);
  router.use('/users', usersRouter);
  router.use('/vaccines', authMiddleware,vaccinesRouter);
}

module.exports = routerApi;
