const express = require('express');
const AppointmentService = require('./../services/appointments.service')
const router = express.Router();
const service = new AppointmentService();

router.get('/', async (req,res,next) => {
  try {
    const appointments = await service.find();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const appointment = await service.findOne(id);
      res.json(appointment);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newAppointment= await service.create(body);
      res.status(201).json(newAppointment)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const appointment = await service.update(id, body);
      res.json(appointment)
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next)  => {
  try {
    const { id } = req.params;
    const rpta = await service.delete(id);
    res.json(rpta);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
