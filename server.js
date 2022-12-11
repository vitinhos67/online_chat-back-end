/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const { setUserOnCache, deleteUserOnCache } = require('./src/services/cache.service');
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

  io.of('/users').on('connection', (socket) => {
    
    socket.on('connectionUser', async (data) => {
      console.log(data);
      await setUserOnCache(data.id, data);
    });

    socket.on('disconnect', async () => {
      await deleteUserOnCache(socket.id);
    });
  });

  server.listen(3000);
})();
