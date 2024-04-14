const pool = require('../../libs/postgres.pool');

class GroomingService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var idappo = data.idappo,
      before = data.before,
      after = data.after,
      comment = data.comment,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO groomingpet(idappointment, photobeforegroomingpet, photoaftergroomingpet, commentsgroomingpet,createat, modifiedat)
	VALUES (${idappo}, '${before}', '${after}', '${comment}', '${createat}', '${modifiedat}') RETURNING idgroomingpet;

  UPDATE appointment SET statusappointment = 'Atendido' WHERE idappointment = ${idappo};`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = 'SELECT * FROM groomingpet;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM groomingpet WHERE idgroomingpet= '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var before = changes.before,
      after = changes.after,
      comment = changes.comment,
      modifiedat = new Date().toJSON();
  const query = `UPDATE groomingpet
	SET photobeforegroomingpet='${before}', photoaftergroomingpet='${after}', commentsgroomingpet='${comment}', modifiedat='${modifiedat}'
	WHERE idgroomingpet = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM groomingpet WHERE idgroomingpet = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = GroomingService;
