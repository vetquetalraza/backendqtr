const boom = require('@hapi/boom');
const pool = require('../../libs/postgres.pool');

class UsersService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var nameuser = data.nameuser;
  var password = data.password;
  var createat = new Date().toJSON();
  var modifiedat = new Date().toJSON();
  const query = `INSERT INTO usuario(nameuser, passworduser, createat, modifiedat)
    VALUES ('${nameuser}', '${password}', '${createat}', '${modifiedat}') RETURNING iduser;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = 'SELECT * FROM usuario;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id) {
  const query = `SELECT * FROM usuario WHERE iduser = ${id}`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async authenticate(values){
  var nameuser = values.username;
  var password = values.password;
  const query = `SELECT iduser, nameuser, passworduser FROM usuario WHERE nameuser = '${nameuser}' and passworduser = '${password}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var nameuser = changes.nameuser;
  var password = changes.password;
  var modifiedat = new Date().toJSON();
  const query = `UPDATE usuario
	SET passworduser='${password}', modifiedat='${modifiedat}'
	WHERE iduser = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM usuario WHERE iduser = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = UsersService;
