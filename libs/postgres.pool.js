const { Pool } = require('pg');
const { config } = require('./../config/config');

// } else {
// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// options.connectionString = URI;
// }

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

module.exports = pool;
