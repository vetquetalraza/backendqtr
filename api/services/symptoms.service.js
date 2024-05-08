const pool = require('../../libs/postgres.pool');

class SymptomsService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async find() {
  const query = 'SELECT idsymptomspet as value, namesymptomspet as label FROM symptomspet;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = SymptomsService;
