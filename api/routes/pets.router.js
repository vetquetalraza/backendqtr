const express = require('express');
const PetsService = require('./../services/pets.service')
const router = express.Router();
const service = new PetsService();
const upload = require('../middlewares/upload');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

router.get('/', async (req,res,next) => {
  try {
    const pets = await service.find();
    res.json(pets);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const pet = await service.findOne(id);
      res.json(pet);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/client/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const pet = await service.findByClient(id);
    res.json(pet);
  } catch (error) {
    next(error);
  }
}
);

router.post('/', upload.single('photoFile'), async (req, res, next) => {

    try {
      const body = req.body;
      let photoUrl = null;

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer);
        photoUrl = result.secure_url;
      }

      body.photo = photoUrl;

      const newPet = await service.create_update(body);
      res.status(201).json(newPet)
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
