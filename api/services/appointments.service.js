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
      duration = data.duration,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO appointment(idpet, idvetservices, dateappointment, timeappointment, commentappointment, statusappointment, createat, modifiedat,durationappointment)
    VALUES (${idpet}, ${idservice}, '${dateappo}', '${timeappo}', '${comment}', '${status}', '${createat}', '${modifiedat}',${duration}) RETURNING idappointment;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = `SELECT ap.idappointment ,namevetservices,TO_CHAR(dateappointment, 'yyyy-mm-dd') as  dateappointment, timeappointment, durationappointment
  FROM appointment as ap
  INNER JOIN vetservices as vt on ap.idvetservices = vt.idvetservices`;
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
      duration = data.duration,
      modifiedat = new Date().toJSON();
  const query = `UPDATE appointment
	SET idvetservices=${idservice}, dateappointment='${dateappo}', timeappointment='${timeappo}', durationappointment = '${duration}', commentappointment='${comment}', statusappointment='${status}', modifiedat='${modifiedat}'
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
