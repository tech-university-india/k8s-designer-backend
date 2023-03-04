const express = require('express');
const routes =express();
const projectController= require('../controllers/project.controller');

routes.post('/projects',projectController.setMicroServicesConfig);

  
module.exports = routes;