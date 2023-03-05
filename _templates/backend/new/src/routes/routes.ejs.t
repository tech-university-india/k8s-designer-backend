---
to: output-boilerplates/<%= appName %>/src/routes/<%=appName%>.routes.js
force: true
---
const routes = require('express').Router();
const controllers = require('<%="../controllers/"+ appName+".controllers" %>');

routes.route('/ping')
  .get(controllers.getDetails);

module.exports = routes;