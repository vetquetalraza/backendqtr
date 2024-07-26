const express = require('express');
const BatchService = require('../services/batch.service')
const router = express.Router();
const service = new BatchService();

router.get('/', async (req,res,next) => {
  try {
    const batches = await service.find();
    res.json(batches);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const batch = await service.findOne(id);
      res.json(batch);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newBatch = await service.create(body);
      res.status(201).json(newBatch)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const batch = await service.update(id, body);
      res.json(batch)
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
