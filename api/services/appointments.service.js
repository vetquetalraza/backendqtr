const pool = require('../../libs/postgres.pool');

class ApposService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var idpet = data.idpet,
      idservice = data.idservice,
      dateappo = data.dateappo,
      timeappo = data.timeappo,
      comment = data.comment,
      status = data.status,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO appointment(idpet, idvetservices, dateappointment, timeappointment, commentappointment, statusappointment, createat, modifiedat)
    VALUES (${idpet}, ${idservice}, '${dateappo}', '${timeappo}', '${comment}', '${status}', '${createat}', '${modifiedat}') RETURNING idappointment;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = 'SELECT * FROM appointment;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM appointment WHERE idappointment= '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var idservice = changes.idservice,
      dateappo = changes.dateappo,
      timeappo = changes.timeappo,
      comment = changes.comment,
      status = changes.status,
      modifiedat = new Date().toJSON();
  const query = `UPDATE appointment
	SET idvetservices=${idservice}, dateappointment='${dateappo}', timeappointment='${timeappo}', commentappointment='${comment}', statusappointment='${status}', modifiedat='${modifiedat}'
	WHERE idappointment = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM appointment WHERE idappointment = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = ApposService;
