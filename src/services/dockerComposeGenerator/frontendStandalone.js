const mustache = require('mustache');
const fs = require('fs');

const mockFrontendConfig = {
    name: 'frontend-application',
    port: 3000,
    internalPort: 3000,
    environment: [
        {name: "BACKEND_API_URL", value: "http://backend-application:8080"},
        {name: 'DEBUG', value: true}
    ],
    replicas: 3
}

const template = fs.readFileSync('../../templates/dockerComposeGenerator/frontendStandalone.mustache', 'utf-8');

const dockerComposeFile = mustache.render(template, mockFrontendConfig);

fs.writeFileSync('docker-compose.yml', dockerComposeFile);
