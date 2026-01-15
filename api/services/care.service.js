const pool = require('../../libs/postgres.pool');

class CaresService {

constructor(){
  this.pool = pool;
  if (this.pool.listenerCount('error') === 0) {
    this.pool.on('error', (err) => console.error(err));
  }
}

async findOne(id){
  const cadena = id.split('&');
  const start = cadena[0];
  const end = cadena[1];
  const query = `SELECT idappointment, ap.idpet as idpet, TO_CHAR(dateappointment, 'dd/mm/yyyy') as dateappointment, timeappointment, nameclient, surnameclient, namepet, namespeciepet, namevetservices, ap.idvetservices as idvetservices, statusappointment FROM appointment AS ap
  INNER JOIN pet on pet.idpet = ap.idpet
  INNER JOIN client on client.dniclient = pet.dniclient
  INNER JOIN speciePet on pet.idspeciepet = speciePet.idspeciepet
  INNER JOIN vetservices on vetservices.idvetservices = ap.idvetservices
  where dateappointment >='${start}' and dateappointment <= '${end}' and statusappointment='1';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = CaresService;
