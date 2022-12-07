/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const routes = require('./router');
const errors = require('./src/middleware/error.handler');

const socket = new Server(server, {
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

  socket.on('connection', (clientSocket) => {
    console.log(`Client Connected:${clientSocket.id}`);

    socket.on('message', (msg) => {
      console.log(msg);
    });
  });

  server.listen(3000);
})();
