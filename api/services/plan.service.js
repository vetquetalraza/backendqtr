const id = require('faker/lib/locales/id_ID');
const pool = require('../../libs/postgres.pool');

class PlanService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var idappo = data.idappo,
      idvaccine = data.idvaccine,
      //schedule = data.schedule,
      weight = data.weight,
      temperature = data.temperature,
      //nextdate = data.nextdate,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO vaccinescheduling(idappointment, createat, modifiedat, weigthvaccine, temperaturevaccine)
    VALUES (${idappo}, '${createat}', '${modifiedat}',${weight}, ${temperature}) RETURNING idvaccinescheduling`;

  const rpta = await this.pool.query(query);

  const idschedule = rpta.rows.data[0].idAppointment;

  idvaccine.array.forEach(element => {
    var secondQuery = `INSERT INTO historyvaccine(idvaccine, idvaccinescheduling, createat, modifiedat)
	  VALUES (${element}, ${idschedule}, '${createat}', '${modifiedat}') `;
    this.pool.query(secondQuery);
  });

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
