const pool = require('../../libs/postgres.pool');

class PlanService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    var idappo = data.idappo,
      idvaccine = data.idvaccine,
      //schedule = data.schedule,
      weight = data.weight,
      temperature = data.temperature,
      //nextdate = data.nextdate,
      comments = data.comments,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
    const query = `UPDATE appointment SET statusappointment = 'Atendido' WHERE idappointment = ${idappo};

    INSERT INTO vaccinescheduling(idappointment, createat, modifiedat, weigthvaccine, temperaturevaccine,commentsvaccine)
    VALUES (${idappo}, '${createat}', '${modifiedat}',${weight}, ${temperature},'${comments}') RETURNING idvaccinescheduling`;

    const rpta = await this.pool.query(query);
    const idschedule = rpta[1].rows[0].idvaccinescheduling;

    idvaccine.forEach(element => {
      var secondQuery = `INSERT INTO historyvaccine(iddrug, idvaccinescheduling, createat, modifiedat,numbervaccine)
	    VALUES (${element.idvaccine}, ${idschedule}, '${createat}', '${modifiedat}',${element.dosage});`;
      this.pool.query(secondQuery);
    });

    return rpta.rows;
  }

  async find() {
    const query = 'SELECT * FROM historyvaccine;';
    const rpta = await this.pool.query(query);
    return rpta.rows;
  }

  async findOne(id) {
    const query = `SELECT ap.idappointment, numbervaccine, hi.idvaccine , vc.namevaccine, TO_CHAR(dateappointment, 'dd/mm/yyyy') as dateappointment from appointment as ap
    INNER JOIN vaccinescheduling as sc ON sc.idappointment = ap.idappointment
    INNER JOIN historyvaccine as hi ON hi.idvaccinescheduling = sc.idvaccinescheduling
    INNER JOIN vaccine as vc ON vc.idvaccine = hi.idvaccine
    WHERE ap.idpet = ${id};`;
    const rpta = await this.pool.query(query);
    return rpta.rows;
  }

  async update(id, changes) {
    var weight = changes.weight, temperature = changes.temperature, nextdate = changes.nextdate, modifiedat = new Date().toJSON();
    const query = `UPDATE historyvaccine
	SET weigthvaccine='${weight}', temperaturevaccine='${temperature}', nextdatevaccine='${nextdate}', modifiedat='${modifiedat}'
	WHERE idhistoryvaccine = '${id}';`;
    const rpta = await this.pool.query(query);
    return rpta.rows;
  }

  async delete(id) {
    const query = `DELETE FROM historyvaccine WHERE idhistoryvaccine = '${id}';`;
    const rpta = await this.pool.query(query);
    return rpta.rows;
  }

}

module.exports = PlanService;
