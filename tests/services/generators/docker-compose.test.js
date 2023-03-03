const fs = require('fs').promises;
const path = require('path');
const {
  TEMPLATE_PATH,
  UTF8_ENCODING,
  OUTPUT_PATH,
} = require('../../../src/constants/app.constants');
const dockerComposeGenerator = require('../../../src/services/generators/docker-compose.js');
const InvalidServiceTypeException = require('../../../src/exceptions/InvalidServiceTypeException');
const ProjectDirectoryNotFoundException = require('../../../src/exceptions/ProjectDirectoryNotFoundException');

const projectId = 1;
const invalidProjectId = '999';

const serviceType = 'FRONTEND';
const invalidServiceType = 'INVALID_SERVICE_TYPE';

const config = {
  name: 'frontend-application',
  port: 3000,
  internalPort: 3000,
  environment: [
    { name: 'BACKEND_API_URL', value: 'http://backend-application/8080' },
    { name: 'DEBUG', value: true },
  ],
  replicas: 3,
};

describe('dockerComposeGenerator', () => {
  const mockStat = jest.fn();
  const mockReadFile = jest.fn();
  const mockWriteFile = jest.fn();

  beforeAll(() => {
    jest.spyOn(fs, 'stat').mockImplementation(mockStat);
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
    const templatePath = TEMPLATE_PATH[serviceType];
    const projectDir = path.join(OUTPUT_PATH, projectId.toString());
    const dockerComposePath = path.join(projectDir, 'docker-compose.yaml');

    const template = `version: '3'
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

    const expectedDockerComposeFile = `version: '3'
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

    const mockedStats = { size: 1024 };
    mockStat.mockResolvedValue(mockedStats);

    mockReadFile.mockResolvedValue(template);

    await dockerComposeGenerator(projectId, serviceType, config);

    expect(mockStat).toHaveBeenCalledWith(projectDir);
    expect(mockReadFile).toHaveBeenCalledWith(templatePath, UTF8_ENCODING);
    expect(mockWriteFile).toHaveBeenCalledWith(
      dockerComposePath,
      expectedDockerComposeFile,
      UTF8_ENCODING
    );
  });

  it('should throw an InvalidServiceTypeError if the service type is invalid', async () => {
    await expect(
      dockerComposeGenerator(projectId, invalidServiceType, config)
    ).rejects.toThrow(InvalidServiceTypeException);

    expect(mockStat).not.toHaveBeenCalled();
    expect(mockReadFile).not.toHaveBeenCalled();
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it('should throw a ProjectDirectoryNotFoundError if the project directory does not exist', async () => {
    mockStat.mockRejectedValue(
      new ProjectDirectoryNotFoundException(invalidProjectId)
    );

    await expect(
      dockerComposeGenerator(invalidProjectId, serviceType, config)
    ).rejects.toThrow(ProjectDirectoryNotFoundException);

    expect(mockReadFile).not.toHaveBeenCalled();
    expect(mockWriteFile).not.toHaveBeenCalled();
  });
});
