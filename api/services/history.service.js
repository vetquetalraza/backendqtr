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
  const query = `SELECT idgroomingpet, idappointment, photobeforegroomingpet, photoaftergroomingpet, commentsgroomingpet, TO_CHAR(createat, 'dd/mm/yyyy HH24:MI') as createat
	FROM groomingpet WHERE idappointment = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findMedical(id) {
  const query = `SELECT
  ca.idpetcare,
  ca.idappointment,
  ca.anamnesispetcare,
  ca.weightpetcare,
  ca.temperaturepetcare,
  ca.treatmentpetcare,
  TO_CHAR(ca.createat, 'dd/mm/yyyy HH24:MI') as createat,

  (
    SELECT jsonb_agg(DISTINCT jsonb_build_object('name', sym.namesymptomspet))
    FROM historysymptomspet his
    JOIN symptomspet sym ON his.idsymptomspet = sym.idsymptomspet
    WHERE his.idpetcare = ca.idpetcare
  ) AS symptoms,

  (
    SELECT jsonb_agg(DISTINCT jsonb_build_object('name', dig.namediagnosispet))
    FROM historydiagnosispet hig
    JOIN diagnosispet dig ON hig.iddiagnosispet = dig.iddiagnosispet
    WHERE hig.idpetcare = ca.idpetcare
  ) AS diagnosis,

  (
    SELECT jsonb_agg(DISTINCT jsonb_build_object(
      'dosage', med.dosagehistorymedicine,
      'name', dru.namedrug,
      'presentation', dru.presentationdrug
    ))
    FROM historymedicine med
    JOIN drugs dru ON med.iddrug = dru.iddrug
    WHERE med.idpetcare = ca.idpetcare
  ) AS medicines

  FROM petcare AS ca
  WHERE ca.idappointment = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findPlan(id) {
  const query = `SELECT vac.idvaccinescheduling, vac.idappointment, TO_CHAR(vac.createat, 'dd/mm/yyyy HH24:MI') as createat,
  vac.weigthvaccine, vac.temperaturevaccine, vac.commentsvaccine,
  json_agg(json_build_object('number',his.numbervaccine, 'name',dru.namedrug, 'presentation',dru.presentationdrug)) as vaccines
  FROM vaccinescheduling AS vac
  JOIN historyvaccine AS his ON vac.idvaccinescheduling = his.idvaccinescheduling
  JOIN drugs AS dru ON his.iddrug = dru.iddrug
  WHERE idappointment = '${id}'
  GROUP BY vac.idvaccinescheduling, vac.idappointment,vac.weigthvaccine, vac.createat,vac.temperaturevaccine, vac.commentsvaccine;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = HistoryService;
