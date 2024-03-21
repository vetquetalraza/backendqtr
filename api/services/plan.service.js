const pool = require('../../libs/postgres.pool');

class PlanService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var idvaccine = data.idvaccine,
      schedule = data.schedule,
      weight = data.weight,
      temperature = data.temperature,
      nextdate = data.nextdate,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO historyvaccine(idvaccine, idvaccinescheduling, weigthvaccine, temperaturevaccine, nextdatevaccine, createat, modifiedat)
	VALUES ('${idvaccine}', '${schedule}', '${weight}', '${temperature}', '${nextdate}', '${createat}', '${modifiedat}') RETURNING idhistoryvaccine;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = 'SELECT * FROM historyvaccine;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM historyvaccine WHERE idhistoryvaccine= '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var weight = changes.weight,
      temperature = changes.temperature,
      nextdate = changes.nextdate,
      modifiedat = new Date().toJSON();
  const query = `UPDATE historyvaccine
	SET weigthvaccine='${weight}', temperaturevaccine='${temperature}', nextdatevaccine='${nextdate}', modifiedat='${modifiedat}'
	WHERE idhistoryvaccine = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM historyvaccine WHERE idhistoryvaccine = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = PlanService;
