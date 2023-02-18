const fs = require('fs').promises;
const path = require('path');
const serviceTemplatePaths = require('../../../src/constants/serviceTemplatePaths');
const dockerComposeGenerator = require('../../../src/services/generators/docker-compose.js');

const projectId = 1;

const serviceType = 'FRONTEND';
const invalidServiceType = 'INVALID_SERVICE_TYPE';

const config = {
    name: 'frontend-application',
    port: 3000,
    internalPort: 3000,
    environment: [
        { name: 'BACKEND_API_URL', value: 'http://backend-application/8080' },
        { name: 'DEBUG', value: true }
    ],
    replicas: 3
}

describe('dockerComposeGenerator', () => {
    const mockAccess = jest.fn();
    const mockMkdir = jest.fn();
    const mockReadFile = jest.fn();
    const mockWriteFile = jest.fn();

    beforeAll(() => {
        jest.spyOn(fs, 'access').mockImplementation(mockAccess);
        jest.spyOn(fs, 'mkdir').mockImplementation(mockMkdir);
        jest.spyOn(fs, 'readFile').mockImplementation(mockReadFile);
        jest.spyOn(fs, 'writeFile').mockImplementation(mockWriteFile);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should generate a docker-compose.yaml file', async () => {
        const templatePath = serviceTemplatePaths[serviceType];
        const projectDir = path.join(__dirname, `../../../src/constants/tmp/${projectId}`);
        const dockerComposePath = path.join(projectDir, 'docker-compose.yaml');

        const template = 
        
            `version: '3'
            services:
            frontend:
                name: "{{name}}"
                ports:
                - "{{port}}:{{internalPort}}"
                environment:
            {{#environment}}
                {{name}}: "{{{value}}}"
            {{/environment}}
                deploy:
                replicas: {{replicas}}
            `;

        const expectedDockerComposeFile = 
        
            `version: '3'
            services:
            frontend:
                name: "frontend-application"
                ports:
                - "3000:3000"
                environment:
                BACKEND_API_URL: "http://backend-application/8080"
                DEBUG: "true"
                deploy:
                replicas: 3
            `;

        mockReadFile.mockResolvedValue(template);

        await dockerComposeGenerator(projectId, serviceType, config);

        expect(mockAccess).toHaveBeenCalledWith(projectDir);
        
        if(mockMkdir.mock.calls.length === 1) {
            expect(mockMkdir).toHaveBeenCalledWith(projectDir);
        }

        expect(mockReadFile).toHaveBeenCalledWith(templatePath, 'utf-8');
        expect(mockWriteFile).toHaveBeenCalledWith(dockerComposePath, expectedDockerComposeFile, 'utf-8');
    });

    it('should throw an error if the service type is invalid', async () => {
        try {
            await expect(dockerComposeGenerator(projectId, invalidServiceType, config));
        } catch(err) {
            expect(err.message).toBe('Invalid service type: INVALID_SERVICE_TYPE');
        }

        expect(mockAccess).not.toHaveBeenCalled();
        expect(mockMkdir).not.toHaveBeenCalled();
        expect(mockReadFile).not.toHaveBeenCalled();
        expect(mockWriteFile).not.toHaveBeenCalled();
    });
});
