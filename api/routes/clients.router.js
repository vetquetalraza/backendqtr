const express = require('express');

const ClientsService = require('./../services/clients.service')
const validatorHandler = require('./../middlewares/validator.handler');
const { createClientSchema , updateClientSchema, getClientSchema} = require('./../schemas/clients.schema');

const router = express.Router();
const service = new ClientsService();

router.get('/', async (req,res) => {
  const clients = await service.find();
  res.json(clients);
});

router.get('/:id',
  validatorHandler(getClientSchema, 'params'),
  async (req,res,next) => {
    try {
      const { id } = req.params;
      const client = await service.findOne(parseInt(id));
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createClientSchema, 'body'),
  async (req, res)  => {
    try {
      const body = req.body;
      const newClient = await service.create(body);
      res.status(201).json(newClient)
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getClientSchema, 'params'),
  validatorHandler(updateClientSchema, 'body'),
  async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const client = await service.update(parseInt(id), body);
      res.json(client)
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res)  => {
  const { id } = req.params;
  const rpta = await service.delete(id);
  res.json(rpta);
});

module.exports = router;
