const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('../../libs/sequelize');
const pool = require('../../libs/postgres.pool');

class ClientsService {

constructor(){
  this.clients = [];
  this.generate();
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

generate() {
  const limit = 100;
  for (let index = 0 ; index < limit; index++) {
     this.clients.push({
     id: faker.number.int(),
     name: faker.person.fullName(),
     gender: faker.person.sex(),
     isBlock: faker.datatype.boolean()
   });
 }
}

async create(data) {
  const newClient = {
    id: faker.number.int(),
    ...data
  }
  this.clients.push(newClient);
  return newClient
}

async find() {
  const query = 'SELECT * FROM client';
  const rpta = await this.pool.query(query);
  return rpta.rows;

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(this.clients);
  //   }, 5000);
  // });
  // // return this.clients;
}

async findOne(id){
  const client = this.clients.find(item => item.id === id);
  if (!client) {
    throw boom.notFound('Client not found');
  }
  if (client.isBlock) {
    throw boom.conflict('Client is block');
  }
  return client;
}

async update(id, changes){
  const index = this.clients.findIndex(item => item.id === id);
  if (index === -1) {
    throw boom.notFound('Client not found');
  } else {
    const client = this.clients[index];
    this.clients[index] = {
      ...client,
      ...changes
    };
    return this.clients[index];

  }
}

async delete(id){
  const index = this.clients.findIndex(item => item.id === id);
  if (index === -1) {
    throw boom.notFound('Client not found');
  } else {
    this.clients.splice(index,1);
    return { id };
  }
}

}

module.exports = ClientsService
