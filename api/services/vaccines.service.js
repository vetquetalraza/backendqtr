const pool = require('../../libs/postgres.pool');

class VaccinesService {

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
  const query = `INSERT INTO vaccine(namevaccine, descriptionvaccine, batchvaccine, duedatevaccine, brandvaccine, stockvaccine, createat, modifiedat)
	VALUES ('${name}', '${description}', '${batch}', '${duedate}', '${brand}', ${stock}, '${createat}', '${modifiedat}') RETURNING idvaccine;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = 'SELECT * FROM drugs;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findFilter() {
  const query = 'SELECT * FROM drugs WHERE stockvaccine > 0;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM drugs WHERE iddrug= '${id}';`;
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
  const query = `UPDATE vaccine
	SET namevaccine='${name}', descriptionvaccine='${description}', batchvaccine='${batch}', duedatevaccine='${duedate}', brandvaccine='${brand}', stockvaccine='${stock}', modifiedat='${modifiedat}'
	WHERE idvaccine = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM drugs WHERE iddrug = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = VaccinesService;
