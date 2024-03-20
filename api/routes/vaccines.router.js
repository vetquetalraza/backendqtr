const express = require('express');
const VaccinesService = require('./../services/vaccines.service')
const router = express.Router();
const service = new VaccinesService();

router.get('/', async (req,res,next) => {
  try {
    const vaccines = await service.find();
    res.json(vaccines);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const vaccine = await service.findOne(id);
      res.json(vaccine);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newVaccine = await service.create(body);
      res.status(201).json(newVaccine)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const vaccine = await service.update(id, body);
      res.json(vaccine)
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
