---
to: <%= outputPath %>/<%= appName %>/src/routes/healthcheck.routes.js
force: true
---
const routes = require('express').Router();
const controllers = require('../controllers/healthcheck.controllers.js');

routes.route('/ping')
  .get(controllers.getDetails);

module.exports = routes;