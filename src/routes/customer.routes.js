const routes = require('express').Router();
const controller = require('../controllers/customer.controller');
const middlewares = require('../middlewares/cutomer.middleware');

routes.route('/ping')
  .get(middlewares.validationTest, controller.getCustomerOrderDetails);

module.exports = routes;