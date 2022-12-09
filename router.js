const express = require('express');

const routes = express.Router();

const { index } = require('./src/controllers/home.handler');
const { store, login } = require('./src/controllers/user.handler');
const { addMessage } = require('./src/controllers/messages.handler');

routes.get('/', index);
routes.post('/user', store);
routes.post('/login', login);
routes.post('/addmessage', addMessage);

module.exports = routes;