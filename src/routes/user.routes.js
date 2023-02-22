const routes = require('express').Router();
const userControllers = require('../controllers/user.controller');
const microServiceController= require('../controllers/microservices.controllers');
const requestValidators = require('../middlewares/request.middleware');
const schemas = require('../schemas/index.schema');

// routes.route('/ping')
//   .get(userControllers.getOrderDetails);


routes.route('/createUser')
  .get(userControllers.postNewUser);

// routes.route('/customers/:customer_id')
//   .get(requestValidators.validate(schemas.customerSchema), userControllers.getCustomerOrderDetails);


  
routes.route('/generate')
  .post(microServiceController.setMicroServicesConfig);

  
module.exports = routes;