---
to: <%= outputPath %>/<%= appName %>/src/services/healthcheck.services.js
force: true
---
const data = require('../../data/input.json');

const getDetails = () => data.colors;

module.exports = { getDetails };