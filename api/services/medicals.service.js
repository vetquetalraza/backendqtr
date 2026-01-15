const pool = require('../../libs/postgres.pool');

class MedicalsService {

constructor(){
  this.pool = pool;
  if (this.pool.listenerCount('error') === 0) {
    this.pool.on('error', (err) => console.error(err));
  }
}

async create(data) {
  var idappo = data.idappo,
      anamnesis = data.anamnesis,
      weight = data.weight,
      temperature = data.temperature,
      treatment = data.treatment,
      symptoms = data.symptoms,
      diagnosis = data.diagnosis,
      materials = data.materials,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `UPDATE appointment SET statusappointment = '2' WHERE idappointment = ${idappo};

  INSERT INTO petcare(idappointment, anamnesispetcare, weightpetcare, temperaturepetcare, treatmentpetcare, createat, modifiedat)
  VALUES (${idappo}, '${anamnesis}', ${weight}, ${temperature},'${treatment}','${createat}','${modifiedat}') RETURNING idpetcare`;

  const rpta = await this.pool.query(query);
  const idpetcare = rpta[1].rows[0].idpetcare;

  // symptoms.forEach(element => {
  //   var secondQuery = `INSERT INTO historysymptomspet(idsymptomspet, idpetcare, createat, modifiedat)
  //     VALUES (${element}, ${idpetcare}, '${createat}', '${modifiedat}');`
  //   this.pool.query(secondQuery);
  // });

  // diagnosis.forEach(element => {
  //   var thirdQuery = `INSERT INTO historydiagnosispet(iddiagnosispet, idpetcare, createat, modifiedat)
  //     VALUES (${element}, ${idpetcare}, '${createat}', '${modifiedat}'); `
  //   this.pool.query(thirdQuery);
  // });

  // materials.forEach(element => {
  //   const [drug,dosage] = element;
  //   var fourthQuery = `INSERT INTO historymedicine(iddrug, idpetcare, dosagehistorymedicine, createat, modifiedat)
  //     VALUES (${drug}, ${idpetcare}, '${dosage}','${createat}', '${modifiedat}'); `
  //   this.pool.query(fourthQuery);
  // });

    // Inserción de síntomas
    const symptomPromises = symptoms.map((element) => {
      const query = `
        INSERT INTO historysymptomspet(idsymptomspet, idpetcare, createat, modifiedat)
        VALUES ($1, $2, $3, $4)
      `;
      return this.pool.query(query, [element, idpetcare, createat, modifiedat]);
    });

    // Inserción de diagnósticos
    const diagnosisPromises = diagnosis.map((element) => {
      const query = `
        INSERT INTO historydiagnosispet(iddiagnosispet, idpetcare, createat, modifiedat)
        VALUES ($1, $2, $3, $4)
      `;
      return this.pool.query(query, [element, idpetcare, createat, modifiedat]);
    });

    // Inserción de medicamentos
    const medicinePromises = materials.map(([drug, dosage]) => {
      const query = `
        INSERT INTO historymedicine(iddrug, idpetcare, dosagehistorymedicine, createat, modifiedat)
        VALUES ($1, $2, $3, $4, $5)
      `;
      return this.pool.query(query, [drug, idpetcare, dosage, createat, modifiedat]);
    });

    // Ejecutar todo en paralelo y esperar
    await Promise.all([
      ...symptomPromises,
      ...diagnosisPromises,
      ...medicinePromises
    ]);

    return 1;

}

}

module.exports = MedicalsService;
