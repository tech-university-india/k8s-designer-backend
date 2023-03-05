---
to: <%= outputPath %>/<%= appName %>/src/services/healthcheck.services.js
force: true
---
<% if(databases.length === 0){ %>
const data = require('../../data/input.json');

const getDetails = () => data.colors;
<% } %>

<% if(databases.length > 0){ %>
const {Color} = require('../models');

const getDetails = async () => {
  const colors = await Color.findAll();
  return colors;
};
<% } %>

module.exports = { getDetails };
