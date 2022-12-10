/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const routes = require('./router');
const errors = require('./src/middleware/error.handler');

const sockets = new Map();

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const { create } = require('./src/services/tables.service');

(async () => {
  require('./src/database/connection');

  await create();
  app.use(express.json());
  app.use(cors());

  app.use(routes);
  app.use(errors);

  io.of('/users').on('connection', (socket) => {
    socket.on('connectionUser', (data) => {
      sockets.set(socket.id, data);
      console.log('Um usuario se conectou');
    });

    socket.on('disconnect', () => {
      sockets.delete(socket.id);
      console.log('Usuario se desconectou');
    });
  });

  server.listen(3000);
})();
