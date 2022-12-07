require('dotenv').config();
const { Client } = require('pg');

const connection = new Client({
  connectionString: process.env.connectionString,
});

connection.connect();

module.exports = connection;
