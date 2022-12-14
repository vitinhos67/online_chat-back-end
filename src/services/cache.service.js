const client = require('../config/redis.connection');

exports.setUserOnCache = async (id, data) => {
  const setUser = await client.set(`client:${id}`, JSON.stringify(data));
  return setUser;
};

exports.getUserOnCache = async () => {
  const response = await client.sendCommand(['keys', 'client:*']);

  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < response.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const users = await client.get(response[i]);
    data.push(JSON.parse(users));
  }

  return data;
};

exports.deleteUserOnCache = async (id) => {
  const delUser = await client.del(`client:${id}`);
  return delUser;
};
