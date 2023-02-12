const routes = require('express').Router();
const controllers = require('../controllers/customer.controller');
const requestValidators = require('../middlewares/request.middleware');
const schemas = require('../schemas/index.schema');

routes.route('/ping')
  .get(controllers.getOrderDetails);
routes.route('/customers/:customer_id')
  .get(requestValidators.validate(schemas.customerSchema), controllers.getCustomerOrderDetails);

module.exports = routes;