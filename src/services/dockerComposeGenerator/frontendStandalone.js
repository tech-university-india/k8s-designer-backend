const mustache = require('mustache');
const fs = require('fs');

const dockerComposeGenerator = (mockFrontendConfig) => {
    const template = fs.readFileSync(__dirname+'/../../templates/dockerComposeGenerator/frontendStandalone.mustache', 'utf-8');

    const dockerComposeFile = mustache.render(template, mockFrontendConfig);

    return dockerComposeFile;
}

module.exports = {dockerComposeGenerator}
