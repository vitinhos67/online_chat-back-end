const redis = require('redis');

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6378,
  password: process.env.password_redis,
});

(async () => {
  await client.connect();
})();

module.exports = client;
