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
      symptoms = data.symptoms,
      diagnosis = data.diagnosis,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `UPDATE appointment SET statusappointment = '3' WHERE idappointment = ${idappo};

  INSERT INTO petcare(idappointment, anamnesispetcare, weightpetcare, temperaturepetcare, treatmentpetcare, createat, modifiedat)
  VALUES (${idappo}, '${anamnesis}', ${weight}, ${temperature},'${treatment}','${createat}','${modifiedat}') RETURNING idpetcare`;

  const rpta = await this.pool.query(query);
  const idpetcare = rpta[1].rows[0].idpetcare;

  symptoms.forEach(element => {
    var secondQuery = `INSERT INTO historysymptomspet(idsymptomspet, idpetcare, createat, modifiedat)
      VALUES (${element}, ${idpetcare}, '${createat}', '${modifiedat}');`
    this.pool.query(secondQuery);
  });


  diagnosis.forEach(element => {
    var thirdQuery = `INSERT INTO historydiagnosispet(iddiagnosispet, idpetcare, createat, modifiedat)
      VALUES (${element}, ${idpetcare}, '${createat}', '${modifiedat}'); `
    this.pool.query(thirdQuery);
  });
  return 1;
}


}

module.exports = MedicalsService;
