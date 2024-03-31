const pool = require('../../libs/postgres.pool');

class CaresService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async findOne(id){
  const query = `SELECT dateappointment, timeappointment, nameclient, surnameclient, namepet, namespeciepet, namevetservices, statusappointment FROM appointment AS ap
  INNER JOIN pet on pet.idpet = ap.idpet
  INNER JOIN client on client.dniclient = pet.dniclient
  INNER JOIN speciePet on pet.idspeciepet = speciePet.idspeciepet
  INNER JOIN vetservices on vetservices.idvetservices = ap.idvetservices
  where dateappointment = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = CaresService;
