const express = require('express');
const HistoryService = require('./../services/history.service')
const router = express.Router();
const service = new HistoryService();

router.get('/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const history = await service.findHistory(id);
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

//Consulta Médica
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

router.get('/symptoms/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const symptoms = await service.findSymptoms(id);
    res.json(symptoms);
  } catch (error) {
    next(error);
  }
}
);

router.get('/diagnosis/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const diagnosis = await service.findDiagnosis(id);
    res.json(diagnosis);
  } catch (error) {
    next(error);
  }
}
);

router.get('/medicines/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const medicines = await service.findMedicines(id);
    res.json(medicines);
  } catch (error) {
    next(error);
  }
}
);

//Plan de vacunación

router.get('/plan/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const history = await service.findPlan(id);
    res.json(history);
  } catch (error) {
    next(error);
  }
});

router.get('/vaccines/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const vaccines = await service.findVaccines(id);
    res.json(vaccines);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
