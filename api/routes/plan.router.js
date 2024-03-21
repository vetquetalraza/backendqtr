const express = require('express');
const PlanService = require('../services/plan.service')
const router = express.Router();
const service = new PlanService();

router.get('/', async (req,res,next) => {
  try {
    const plans = await service.find();
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const plan = await service.findOne(id);
      res.json(plan);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
    try {
      const body = req.body;
      const newPlan = await service.create(body);
      res.status(201).json(newPlan)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const plan = await service.update(id, body);
      res.json(plan)
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
