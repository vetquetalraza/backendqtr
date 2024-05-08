const express = require('express');
const SymptomsService = require('../services/symptoms.service')
const router = express.Router();
const service = new SymptomsService();

router.get('/', async (req,res,next) => {
  try {
    const symptoms = await service.find();
    res.json(symptoms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
