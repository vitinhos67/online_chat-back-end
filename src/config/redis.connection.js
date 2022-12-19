require('dotenv').config();
const redis = require('redis');

const client = redis.createClient();

(async () => {
  await client.connect();
})();

module.exports = client;
