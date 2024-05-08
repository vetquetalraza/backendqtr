const express = require('express');
const DiagnosisService = require('../services/diagnosis.service')
const router = express.Router();
const service = new DiagnosisService();

router.get('/', async (req,res,next) => {
  try {
    const diagnosis = await service.find();
    res.json(diagnosis);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
