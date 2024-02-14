const express = require('express');

const router = express.Router();

router.get('/pets', (req,res) => {
  res.json([
    {
      name: 'Moly',
      specie: 'Gato'
    },
    {
      name: 'Paquito',
      specie: 'Gato'
    }
  ]);
});

router.get('/pets/:id', (req,res) => {
  const { id } = req.params;

  res.json(
    {
      id,
      name: 'Moly',
      specie: 'Gato'
    });
});

module.exports = router;
