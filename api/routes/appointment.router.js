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
      const newAppointment= await service.create_update(body);
      res.status(201).json(newAppointment)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
