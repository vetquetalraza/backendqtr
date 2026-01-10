const express = require('express');
const GroomingService = require('../services/grooming.service')
const router = express.Router();
const service = new GroomingService();
const upload = require('../middlewares/upload');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

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

router.post('/', upload.fields([
    { name: 'beforePhoto', maxCount: 1 },
    { name: 'afterPhoto', maxCount: 1 }
  ]),
  async (req, res, next) => {

    try {
      const body = req.body;
      let before = null;
      let after = null;

      if (req.files?.beforePhoto) {
        const result = await uploadToCloudinary(req.files.beforePhoto[0].buffer);
        before = result;
      }

      if (req.files?.afterPhoto) {
        const result = await uploadToCloudinary(req.files.afterPhoto[0].buffer);
        after = result;
      }

      body.before = before?.url || null;
      body.beforephotopublicid = before?.public_id || null;

      body.after = after?.url || null;
      body.afterphotopublicid = after?.public_id || null;

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
