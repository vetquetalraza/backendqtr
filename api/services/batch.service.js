const pool = require('../../libs/postgres.pool');

class BatchService {

constructor(){
  this.pool = pool;
  if (this.pool.listenerCount('error') === 0) {
    this.pool.on('error', (err) => console.error(err));
  }
}

async create(data) {
  var iddrug = data.iddrug,
      number = data.number,
      quantity = data.quantity,
      startdate = data.startdate,
      duedate = data.duedate,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO batchesdrugs(iddrug, numberbatch, quantity, manufacturedate, expirationdate, createat, modifiedat)
	VALUES (${iddrug}, '${number}', ${quantity}, '${startdate}', '${duedate}', '${createat}', '${modifiedat}') RETURNING idbatch;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}
module.exports = BatchService;
