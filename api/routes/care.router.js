const express = require('express');
const CareService = require('./../services/care.service')
const router = express.Router();
const service = new CareService();


router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const cares = await service.findOne(id);
      res.json(cares);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
