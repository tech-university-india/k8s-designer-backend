const routes = require('express').Router();
const userControllers = require('../controllers/user.controller');


routes.post('/users',userControllers.createUser);

module.exports = routes;