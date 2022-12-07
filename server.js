/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const socket = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const { create } = require('./src/services/tables.service');

(async () => {
  const client = await require('./src/database/connection')();
  await create(client);

  app.use(cors());

  socket.on('connection', (clientSocket) => {
    console.log(`Client Connected:${clientSocket.id}`);

    socket.on('message', (msg) => {
      console.log(msg);
    });
  });

  server.listen(3000);
})();
