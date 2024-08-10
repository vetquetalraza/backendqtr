const pool = require('../../libs/postgres.pool');

class HistoryService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

//Traer datos de la mascota y su dueño
async findPet(id) {
  const query = 'SELECT * FROM drugs;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

//Traer datos de todas las atenciones o historial, baños, consulta medica y plan de vacunación.
async findGrooming(id) {
  const query = `SELECT * FROM drugs WHERE iddrug = '${id}'`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findMedical(id) {
  const query = `SELECT * FROM drugs WHERE categorydrug = 'Vacuna';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findPlan(id) {
  const query = `SELECT * FROM drugs WHERE categorydrug = 'Vacuna';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}





}

module.exports = HistoryService;
