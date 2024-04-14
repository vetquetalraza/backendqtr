const express = require('express');
const MedicalService = require('../services/medicals.service')
const router = express.Router();
const service = new MedicalService();

router.get('/', async (req,res,next) => {
  try {
    const medicals = await service.find();
    res.json(medicals);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const medical = await service.findOne(id);
      res.json(medical);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newMedical = await service.create(body);
      res.status(201).json(newMedical)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const medical = await service.update(id, body);
      res.json(medical)
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
