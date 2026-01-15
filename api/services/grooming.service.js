const pool = require('../../libs/postgres.pool');

class GroomingService {

constructor(){
  this.pool = pool;
  if (this.pool.listenerCount('error') === 0) {
    this.pool.on('error', (err) => console.error(err));
  }
}

async create(data) {
  var idappo = data.idappo,
      before = data.before,
      beforepublicid = data.beforephotopublicid,
      after = data.after,
      afterpublicid = data.afterphotopublicid,
      comment = data.comment,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO groomingpet(idappointment, photobeforegroomingpet, photoaftergroomingpet, commentsgroomingpet,createat, modifiedat,beforephotopublicid,afterphotopublicid)
	VALUES (${idappo}, '${before}', '${after}', '${comment}', '${createat}', '${modifiedat}','${beforepublicid}', '${afterpublicid}') RETURNING idgroomingpet;

  UPDATE appointment SET statusappointment = '2' WHERE idappointment = ${idappo};`;
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
      beforepublicid = data.beforephotopublicid,
      after = changes.after,
      afterpublicid = data.afterphotopublicid,
      comment = changes.comment,
      modifiedat = new Date().toJSON();
  const query = `UPDATE groomingpet
	SET photobeforegroomingpet='${before}', beforephotopublicid = '${beforepublicid}', photoaftergroomingpet='${after}', afterphotopublicid='${afterpublicid}',commentsgroomingpet='${comment}', modifiedat='${modifiedat}'
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
