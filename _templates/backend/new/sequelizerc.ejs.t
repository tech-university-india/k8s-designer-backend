---
to:  "<%= (databases.length > 0 ? (outputPath + '/' + appName + '/.sequelizerc') : null) %>"
force: true
---
const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'src/models')
};