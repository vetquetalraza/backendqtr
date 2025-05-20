const pool = require('../../libs/postgres.pool');

class HistoryService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

//Traer listado de atenciones
async findHistory(id) {
    const query = `SELECT appo.idappointment , appo.idpet, TO_CHAR(appo.dateappointment, 'dd/mm/yyyy') as dateappointment, appo.timeappointment, ser.namevetservices,
    appo.statusappointment, ser.idvetservices
    FROM appointment as appo
    INNER JOIN vetservices as ser on ser.idvetservices = appo.idvetservices
    WHERE statusappointment = '3' and idpet = '${id}';`
    const rpta = await this.pool.query(query);
    return rpta.rows;
}

//Traer datos de todas las atenciones o historial, baños, consulta medica y plan de vacunación.
async findGrooming(id) {
  const query = `SELECT idgroomingpet, idappointment, photobeforegroomingpet, photoaftergroomingpet, commentsgroomingpet, createat
	FROM groomingpet WHERE idappointment = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findMedical(id) {
  const query = `SELECT * FROM drugs WHERE categorydrug = 'Vacuna';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findPlan(id) {
  const query = `SELECT * FROM drugs WHERE categorydrug = 'Vacuna';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}


}

module.exports = HistoryService;
