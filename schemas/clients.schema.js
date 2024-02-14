const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const gender = Joi.string().min(10).max(15);

const createClientSchema = Joi.object({
  name: name.required(),
  gender: gender.required()
});

const updateClientSchema = Joi.object({
  name: name,
  gender: gender
});

const getClientSchema = Joi.object({
  id: id.required()
});

module.exports = { createClientSchema , updateClientSchema, getClientSchema}
