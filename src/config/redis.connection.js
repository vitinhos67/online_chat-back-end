const redis = require('redis');

const client = redis.createClient({
  host: 'http://localhost',
  port: 6378,
  password: process.env.password_redis,
});

client.on('error', (err) => {
  console.log(`Error ${err}`);
});

module.exports = client;
