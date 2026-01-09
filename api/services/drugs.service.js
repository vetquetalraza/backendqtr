const pool = require('../../libs/postgres.pool');

class DrugsService {

constructor(){
  this.pool = pool;
  this.pool.on('error', (err) => console.error(err));
}

async create(data) {
  var name = data.name,
      description = data.description,
      presentation = data.presentation,
      quantity = data.quantity,
      category = data.category,
      brand = data.brand,
      createat = new Date().toJSON(),
      modifiedat = new Date().toJSON();
  const query = `INSERT INTO drugs(namedrug, descriptiondrug, presentationdrug, quantityperpresentation, categorydrug, branddrug, createat, modifiedat)
	VALUES ('${name}', '${description}', '${presentation}', '${quantity}', '${category}', '${brand}', '${createat}', '${modifiedat}') RETURNING iddrug;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async find() {
  const query = `SELECT
    dr.iddrug, dr.namedrug, dr.descriptiondrug, dr.presentationdrug, dr.quantityperpresentation, dr.categorydrug, dr.branddrug,
    COALESCE(SUM(bt_quantity), 0) AS total_batches ,
    COALESCE(SUM(hv_quantity), 0) AS total_history
FROM
    drugs dr
LEFT JOIN
    (SELECT iddrug, SUM(quantity) AS bt_quantity
     FROM batchesdrugs
     GROUP BY iddrug) AS bt ON dr.iddrug = bt.iddrug
LEFT JOIN
    (SELECT iddrug, SUM(quantity) AS hv_quantity
     FROM historyvaccine
     GROUP BY iddrug) AS hv ON dr.iddrug = hv.iddrug
GROUP BY
    dr.iddrug;`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findMedicines() {
  const query = 'SELECT iddrug as value, CONCAT(namedrug, ' - ', presentationdrug, ' - ', quantityperpresentation ) as label FROM drugs;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findFilter() {
  const query = 'SELECT * FROM drugs WHERE stockvaccine > 0;';
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async findOne(id){
  const query = `SELECT * FROM drugs WHERE iddrug= '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async update(id, changes){
  var name = changes.name,
      description = changes.description,
      batch = changes.batch,
      duedate = changes.duedate,
      brand = changes.brand,
      stock = changes.stock,
      modifiedat = new Date().toJSON();
  const query = `UPDATE vaccine
	SET namevaccine='${name}', descriptionvaccine='${description}', batchvaccine='${batch}', duedatevaccine='${duedate}', brandvaccine='${brand}', stockvaccine='${stock}', modifiedat='${modifiedat}'
	WHERE idvaccine = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

async delete(id){
  const query = `DELETE FROM drugs WHERE iddrug = '${id}';`;
  const rpta = await this.pool.query(query);
  return rpta.rows;
}

}

module.exports = DrugsService;
