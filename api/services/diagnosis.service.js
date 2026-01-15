const pool = require('../../libs/postgres.pool');

class DiagnosisService {

constructor(){
  this.pool = pool;
  if (this.pool.listenerCount('error') === 0) {
    this.pool.on('error', (err) => console.error(err));
  }
}

async find() {
  const query = 'SELECT iddiagnosispet as value, namediagnosispet as label FROM diagnosispet;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = DiagnosisService;
