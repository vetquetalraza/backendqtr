const { Pool } = require('pg');
const { config } = require('./../config/config');

const options = {};

if (config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false,
    // "ecdhCurve": "",
    // "enabled": true,
    // "accept_invalid_cert": false,
    // "ca_file": "",
    // "key_file": "",
    // "cert_file": "",
    // "secure_protocol": "SSLv3_method",
    // "ciphers": ""
  };
} else {
  //options.connectionString = config.dbUrl;
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

const pool = new Pool(options);

module.exports = pool;
