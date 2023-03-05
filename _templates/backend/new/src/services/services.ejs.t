---
to: output-boilerplates/<%= appName %>/src/services/<%=appName%>.services.js
force: true
---
const data = require('../../data/input.json');

const getDetails = () => data.colors;

module.exports = { getDetails };