const express = require('express');
const DrugsService = require('../services/drugs.service')
const router = express.Router();
const service = new DrugsService();

router.get('/', async (req,res,next) => {
  try {
    const drugs = await service.find();
    res.json(drugs);
  } catch (error) {
    next(error);
  }
});

router.get('/filter', async (req,res,next) => {
  try {
    const drugs = await service.findFilter();
    res.json(drugs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const drug = await service.findOne(id);
      res.json(drug);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newDrug = await service.create(body);
      res.status(201).json(newDrug)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const drug = await service.update(id, body);
      res.json(drug)
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
