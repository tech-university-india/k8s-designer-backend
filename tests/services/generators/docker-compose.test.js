const fs = require('fs');
const {dockerComposeGenerator} = require('../../../src/services/generators/docker-compose');

describe('dockerComposeGenerator', () => {
    const mockFrontendConfig = {
        name: 'frontend-application',
        port: 3000,
        internalPort: 3000,
        environment: [
            {name: "BACKEND_API_URL", value: "http://backend-application:8080"},
            {name: 'DEBUG', value: true}
        ],
        replicas: 3
    };

    const expectedDockerComposeFile = fs.readFileSync(__dirname+'/../../mocks/docker-compose/mock-frontend.yaml', 'utf-8');

    it('should generate the expected Docker Compose file from the given configuration', () => {
        const generatedDockerComposeFile = dockerComposeGenerator(mockFrontendConfig);

        expect(generatedDockerComposeFile).toEqual(expectedDockerComposeFile);
    });
});
