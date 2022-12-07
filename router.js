const express = require('express');

const routes = express.Router();

const { index } = require('./src/controllers/home.handler');
const { store, login } = require('./src/controllers/user.handler');

routes.get('/', index);
routes.post('/user', store);
routes.post('/login', login);

module.exports = routes;
