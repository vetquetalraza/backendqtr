const pool = require('../../libs/postgres.pool');

class ApposService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create_update(data) {
  var idappo = data.idappo,
      idpet = data.idpet,
      idservice = data.idservice,
      dateappo = data.dateappo,
      timeappo = data.timeappo,
      comment = data.comment,
      status = data.status,
      duration = data.duration,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `
  DO $$
  BEGIN
      IF EXISTS (
          SELECT 1
          FROM appointment
          WHERE idappointment = ${idappo}
      ) THEN
          UPDATE appointment
	        SET idvetservices=${idservice}, commentappointment='${comment}', statusappointment='${status}', modifiedat='${modifiedat}'
	        WHERE idappointment = ${idappo};
      ELSE

        INSERT INTO appointment(idpet, idvetservices, dateappointment, timeappointment, commentappointment, statusappointment, createat, modifiedat,durationappointment)
        VALUES (${idpet}, ${idservice}, '${dateappo}', '${timeappo}', '${comment}', '${status}', '${createat}', '${modifiedat}',${duration});

      END IF;
  END $$;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = `SELECT ap.idappointment ,ap.idvetservices, namevetservices,TO_CHAR(dateappointment, 'yyyy-mm-dd') as  dateappointment, timeappointment, durationappointment, statusappointment
  FROM appointment as ap
  INNER JOIN vetservices as vt on ap.idvetservices = vt.idvetservices WHERE statusappointment <> '3'`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT cl.dniclient, cl.nameclient, cl.surnameclient, ap.idpet, pt.namepet, ap.idappointment ,idvetservices,TO_CHAR(dateappointment, 'yyyy-mm-dd') as  dateappointment, timeappointment, durationappointment, commentappointment,statusappointment
FROM appointment as ap
INNER JOIN pet as pt on ap.idpet = pt.idpet
INNER JOIN client as cl on pt.dniclient = cl.dniclient
WHERE ap.idappointment  =  '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = ApposService;
