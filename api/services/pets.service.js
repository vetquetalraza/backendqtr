const pool = require('../../libs/postgres.pool');

class PetsService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var client = data.client,
      namepet = data.namepet,
      idspecie = data.idspecie,
      idgender = data.idgender,
      idorigin = data.idorigin,
      race = data.race,
      color = data.color,
      birthdate = data.birthdate,
      signs = data.signs,
      photo = data.photo,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO pet(dniclient, namepet, idspeciepet, idgenderpet, idoriginpet, racepet, colorpet, birthdatepet, particularsignspet, photopet, createat, modifiedat)
	VALUES ( '${client}', '${namepet}', ${idspecie}, ${idgender}, ${idorigin}, '${race}', '${color}', '${birthdate}', '${signs}', '${photo}', '${createat}', '${modifiedat}') RETURNING idpet;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = `SELECT idpet, dniclient, namepet, pet.idspeciepet, namespeciepet, namegenderpet, pet.idgenderpet, idoriginpet, racepet, colorpet, birthdatepet, particularsignspet, photopet, pet.createat, pet.modifiedat
	FROM pet
	INNER JOIN speciePet on pet.idspeciepet = speciePet.idspeciepet
	INNER JOIN genderPet on pet.idgenderpet = genderPet.idgenderpet;`
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM pet WHERE idpet= '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var namepet = changes.namepet,
      idspecie = changes.idspecie,
      idgender = changes.idgender,
      idorigin = changes.idorigin,
      race = changes.race,
      color = changes.color,
      birthdate = changes.birthdate,
      signs = changes.signs,
      photo = changes.photo,
      modifiedat = new Date().toJSON();
  const query = `UPDATE pet
	SET namepet='${namepet}', idspeciepet=${idspecie}, idgenderpet=${idgender}, idoriginpet=${idorigin}, racepet='${race}', colorpet='${color}', birthdatepet='${birthdate}', particularsignspet='${signs}', photopet='${photo}', modifiedat='${modifiedat}'
	WHERE idpet = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM pet WHERE idpet = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = PetsService;
