const pool = require('../../libs/postgres.pool');

class MedicalsService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var idappo = data.idappo,
      anamnesis = data.anamnesis,
      weight = data.weight,
      temperature = data.temperature,
      treatment = data.treatment,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO petcare(idappointment, anamnesispetcare, weightpetcare, temperaturepetcare, treatmentpetcare, createat, modifiedat)
    VALUES (${idappo}, '${anamnesis}', ${weight}, ${temperature},'${treatment}','${createat}','${modifiedat}');
    UPDATE appointment SET statusappointment = 'Atendido' WHERE idappointment = ${idappo};`;

  const rpta = await this.pool.query(query);

  // const idschedule = rpta.rows[0].idvaccinescheduling;

  // idvaccine.forEach(element => {
  //   var secondQuery = `INSERT INTO historyvaccine(idvaccine, idvaccinescheduling, createat, modifiedat)
	//   VALUES (${element}, ${idschedule}, '${createat}', '${modifiedat}'); `;
  //   this.pool.query(secondQuery);
  // });

  return rpta.rows;
}


}

module.exports = MedicalsService;
