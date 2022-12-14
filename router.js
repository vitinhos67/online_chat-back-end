const express = require('express');

const routes = express.Router();

const { index } = require('./src/controllers/home.handler');
const {
  store, login, AllUsersConnectedInChat, findUserById,
} = require('./src/controllers/user.handler');
const { addMessage, backupMessages } = require('./src/controllers/messages.handler');

routes.get('/', index);
routes.post('/user', store);
routes.post('/login', login);
routes.get('/usersOnChat', AllUsersConnectedInChat);
routes.post('/addmessage', addMessage);
routes.post('/messages/restore', backupMessages);
routes.get('/user/:id', findUserById);

module.exports = routes;
