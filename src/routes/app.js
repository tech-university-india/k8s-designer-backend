const routes = require('express').Router();
const controller = require('../controllers/app');
const middlewares = require('../middlewares');

routes.route('/ping')
  .get(middlewares.validationTest, controller.getData);

module.exports = routes;