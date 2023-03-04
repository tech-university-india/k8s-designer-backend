const routes = require('express').Router();
const userControllers = require('../controllers/user.controller');

// routes.route('/ping')
//   .get(userControllers.getOrderDetails);


routes.post('/users',userControllers.createUser);

module.exports = routes;