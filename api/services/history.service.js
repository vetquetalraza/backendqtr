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
  const query = `SELECT idpetcare, idappointment, anamnesispetcare, weightpetcare, temperaturepetcare, treatmentpetcare, TO_CHAR(createat, 'dd/mm/yyyy HH24:MI') as createat
	FROM petcare WHERE idappointment = '${id}';`;
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

async findVaccines(id) {
  const query = `SELECT vac.numbervaccine, dru.namedrug, TO_CHAR(vac.createat, 'dd/mm/yyyy HH24:MI') AS createat
  FROM historyvaccine AS vac
  JOIN drugs AS dru ON vac.iddrug = dru.iddrug
  WHERE idvaccinescheduling = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findSymptoms(id) {
  const query = `SELECT sym.namesymptomspet
  FROM historysymptomspet AS his
  JOIN symptomspet AS sym ON his.idsymptomspet = sym.idsymptomspet
  WHERE his.idpetcare =  '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findDiagnosis(id) {
  const query = `SELECT dig.namediagnosispet
  FROM public.historydiagnosispet AS his
  JOIN diagnosispet AS dig ON his.iddiagnosispet = dig.iddiagnosispet
  WHERE his.idpetcare = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findMedicines(id) {
  const query = `SELECT med.dosagehistorymedicine, dru.namedrug, dru.presentationdrug
  FROM historymedicine AS med
  JOIN drugs AS dru ON med.iddrug = dru.iddrug
  WHERE med.idpetcare = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = HistoryService;
