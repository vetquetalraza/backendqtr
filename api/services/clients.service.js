const boom = require('@hapi/boom');
const pool = require('../../libs/postgres.pool');
const UsersService = require('./users.service')
const user = new UsersService();

class ClientsService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var dni = data.dni;
  var datauser = {"nameuser": dni, "password" : dni};
  var result = await user.create(datauser);
  var iduser = result[0].iduser;
  console.log(iduser);
  var name = data.name;
  var surname = data.surname;
  var address = data.address;
  var email = data.email;
  var phone = data.phone;
  var createat = new Date().toJSON();
  var modifiedat = new Date().toJSON();
  const query = `INSERT INTO client(dniclient, iduser, nameclient, surnameclient, addressclient, emailclient, phoneclient, createat, modifiedat)
  VALUES ('${dni}', ${iduser}, '${name}', '${surname}', '${address}', '${email}', '${phone}', '${createat}', '${modifiedat}');`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = 'SELECT * FROM client';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM client WHERE dniclient = '${id}'`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var name = changes.name;
  var surname = changes.surname;
  var address = changes.address;
  var email = changes.email;
  var phone = changes.phone;
  var modifiedat = new Date().toJSON();
  const query = `UPDATE client
	SET nameclient='${name}', surnameclient='${surname}', addressclient='${address}', emailclient='${email}', phoneclient='${phone}', modifiedat='${modifiedat}'
	WHERE dniclient = '${id}'`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM client WHERE dniclient = '${id}'`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = ClientsService;
