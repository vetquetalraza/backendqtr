const express = require('express');
const GroomingService = require('../services/grooming.service')
const router = express.Router();
const service = new GroomingService();

router.get('/', async (req,res,next) => {
  try {
    const grooming = await service.find();
    res.json(grooming);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const grooming = await service.findOne(id);
      res.json(grooming);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newGrooming = await service.create(body);
      res.status(201).json(newGrooming)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const grooming = await service.update(id, body);
      res.json(grooming)
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
