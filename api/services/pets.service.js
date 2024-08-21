const pool = require('../../libs/postgres.pool');

class PetsService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create_update(data) {
  var id = data.idpet,
      client = data.client,
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
  const query = `
  DO $$
  BEGIN
      IF EXISTS (
          SELECT 1
          FROM pet
          WHERE pet = ${id}
      ) THEN
          UPDATE pet
	        SET namepet='${namepet}', idspeciepet=${idspecie}, idgenderpet=${idgender}, idoriginpet=${idorigin}, racepet='${race}', colorpet='${color}', birthdatepet='${birthdate}', particularsignspet='${signs}', photopet='${photo}', modifiedat='${modifiedat}'
	        WHERE idpet = ${id};
      ELSE

        INSERT INTO pet(dniclient, namepet, idspeciepet, idgenderpet, idoriginpet, racepet, colorpet, birthdatepet, particularsignspet, photopet, createat, modifiedat)
	      VALUES ( '${client}', '${namepet}', ${idspecie}, ${idgender}, ${idorigin}, '${race}', '${color}', '${birthdate}', '${signs}', '${photo}', '${createat}', '${modifiedat}');

      END IF;
  END $$;`;

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
  const query = `SELECT * FROM pet WHERE idpet= ${id};`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findByClient(id){
  const query = `SELECT * FROM pet WHERE dniclient= '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM pet WHERE idpet = ${id};`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = PetsService;
