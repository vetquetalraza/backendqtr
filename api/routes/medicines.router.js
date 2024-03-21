const express = require('express');
const MedicinesService = require('../services/medicines.service')
const router = express.Router();
const service = new MedicinesService();

router.get('/', async (req,res,next) => {
  try {
    const medicines = await service.find();
    res.json(medicines);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const medicine = await service.findOne(id);
      res.json(medicine);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newMedicine = await service.create(body);
      res.status(201).json(newMedicine)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const medicine = await service.update(id, body);
      res.json(medicine)
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
