const pool = require('../../libs/postgres.pool');

class MedicinesService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var name = data.name,
      description = data.description,
      batch = data.batch,
      duedate = data.duedate,
      brand = data.brand,
      stock = data.stock,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO medicine(namemedicine, descriptionmedicine, batchmedicine, duedatemedicine, brandmedicine, stockmedicine, createat, modifiedat)
	VALUES ('${name}', '${description}', '${batch}', '${duedate}', '${brand}', ${stock}, '${createat}', '${modifiedat}') RETURNING idmedicine;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = 'SELECT * FROM medicine;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM medicine WHERE idmedicine= '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var name = changes.name,
      description = changes.description,
      batch = changes.batch,
      duedate = changes.duedate,
      brand = changes.brand,
      stock = changes.stock,
      modifiedat = new Date().toJSON();
  const query = `UPDATE medicine
	SET namemedicine='${name}', descriptionmedicine='${description}', batchmedicine='${batch}', duedatemedicine='${duedate}', brandmedicine='${brand}', stockmedicine='${stock}', modifiedat='${modifiedat}'
	WHERE idmedicine = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM medicine WHERE idmedicine = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = MedicinesService;
