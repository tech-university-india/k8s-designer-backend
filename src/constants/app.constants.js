const path = require('path');

require('dotenv').config();

const PROJECT_ROOT = process.env.PROJECT_ROOT;

const TEMPLATE_PATH = {
  FRONTEND: path.join(
    PROJECT_ROOT,
    'src/templates/docker-compose/frontend.mustache'
  ),
};

const UTF8_ENCODING = 'utf8';
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'tmp');

module.exports = {
  PROJECT_ROOT,
  TEMPLATE_PATH,
  UTF8_ENCODING,
  OUTPUT_PATH,
};
