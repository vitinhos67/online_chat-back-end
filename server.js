/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const { setUserOnCache, deleteUserOnCache } = require('./src/services/cache.service');
const { addMessage } = require('./src/services/messages.service');
const routes = require('./router');
const errors = require('./src/middleware/error.handler');

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const { create } = require('./src/services/tables.service');

(async () => {
  require('./src/database/connection');
  require('./src/config/redis.connection');

  await create();
  app.use(express.json());
  app.use(cors());

  app.use(routes);
  app.use(errors);

  const users = [];

  io.of('/users').on('connection', (socket) => {
    socket.on('connectionUser', async (data) => {
      users[data.id] = socket.id;

      await setUserOnCache(data.id, data);

      socket.on('disconnect', async () => {
        await deleteUserOnCache(data.id);
      });
    });

    socket.on('messageBetweenUsers', async (data) => {
      const values = {
        from_username: data.username,
        for_username: data.for_username,
        from_id: data.user,
        for_id: data.for_user,
        message: data.message,
      };

      await addMessage(values);
      socket.to(users[values.for_id]).emit('receivedMessage', values);
    });
  });

  server.listen(3000);
})();
