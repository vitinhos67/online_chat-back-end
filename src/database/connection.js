require('dotenv').config();
const { Client } = require('pg');

module.exports = async () => {
  const connection = new Client({
    connectionString: process.env.connectionString,
  });

  await connection.connect();

  return connection;
};
