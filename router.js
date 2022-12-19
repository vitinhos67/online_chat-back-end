const express = require('express');

const routes = express.Router();

const { index } = require('./src/controllers/home.handler');
const {
  store, login, AllUsersConnectedInChat, findUserById, addDescription, dataUser,
} = require('./src/controllers/user.handler');
const { addMessage, backupMessages } = require('./src/controllers/messages.handler');
const { authorization } = require('./src/middleware/authorization.handler');

routes.get('/', index);
routes.post('/user', store);
routes.post('/login', login);
routes.get('/usersOnChat', AllUsersConnectedInChat);
routes.post('/add/message', addMessage);
routes.post('/add/description', authorization, addDescription);
routes.post('/messages/restore', backupMessages);
routes.get('/user/:id', findUserById);
routes.get('/data/user', authorization, dataUser);

module.exports = routes;
