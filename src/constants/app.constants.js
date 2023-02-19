const path = require('path');

const TEMPLATE_PATH = {
    FRONTEND: path.join(__dirname, '/../templates/docker-compose/frontend.mustache')
}

const UTF8_ENCODING='utf8';
const TEMP_PATH = path.join(__dirname, '../../tmp');

module.exports = {
    TEMPLATE_PATH,
    UTF8_ENCODING,
    TEMP_PATH
};