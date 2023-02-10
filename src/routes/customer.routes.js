const routes = require('express').Router();
const controller = require('../controllers/customer.controller');
const middlewares = require('../middlewares/cutomerValidator');

routes.route('/ping')
  .get(middlewares.validationSchema('customerIdSchema'), controller.getCustomerOrderDetails);


routes.get(
  '/users',(req,res)=>{
    controller.getUsers(req,res);
  });

module.exports = routes;