const express = require('express');
const HistoryService = require('./../services/history.service')
const router = express.Router();
const service = new HistoryService();

router.get('/pet/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const history = await service.findPet(id);
    res.json(history);
  } catch (error) {
    next(error);
  }
}
);

router.get('/grooming/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const history = await service.findGrooming(id);
      res.json(history);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/medical/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const history = await service.findMedical(id);
    res.json(history);
  } catch (error) {
    next(error);
  }
}
);

router.get('/plan/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const history = await service.findPlan(id);
    res.json(history);
  } catch (error) {
    next(error);
  }
}
);

module.exports = router;
