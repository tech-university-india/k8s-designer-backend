const projectServiceConfigRepository = require('../../src/repositories/projectServiceConfig.repositories');
const envVariablesRepository = require('../../src/repositories/envVariables.repositories');
const frontendServiceRepository = require('../../src/repositories/frontendService.repositories');
const backendServiceRepository = require('../../src/repositories/backendService.repositories');

jest.mock('../../src/repositories/projectServiceConfig.repositories', () => ({
  create: jest.fn(),
}));

jest.mock('../../src/repositories/envVariables.repositories', () => ({
  create: jest.fn(),
}));

jest.mock('../../src/repositories/frontendService.repositories', () => ({
  create: jest.fn(),
}));

jest.mock('../../src/repositories/backendService.repositories', () => ({
  create: jest.fn(),
}));

const repositoryServiceObj = require('../../src/utility/projects.utils');

describe('Repository Service Object', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('called with FrontEnd as key', () => {
    it('should create a new frontend service', async () => {
      const service = {
        service_type: 'FrontEnd',
        configurations: {
          numberOfReplicas: 2,
          name: 'frontend',
          port: 3000,
        },
        customEnv: {
          field: 'DATABASE_URL',
          value: 'postgres://localhost:5432/mydb',
        },
      };
      const projectId = 1;

      projectServiceConfigRepository.create.mockResolvedValue({ id: 1 });
      frontendServiceRepository.create.mockResolvedValue({ id: 1 });
      envVariablesRepository.create.mockResolvedValue({ id: 1 });

      const serviceId = await repositoryServiceObj.FrontEnd(service, projectId);

      expect(serviceId).toBe(1);
      expect(projectServiceConfigRepository.create).toHaveBeenCalledWith({
        serviceType: 'FrontEnd',
        projectId,
      });
      expect(frontendServiceRepository.create).toHaveBeenCalledWith({
        numberOfReplicas: 2,
        name: 'frontend',
        port: 3000,
        serviceId: 1,
      });
      expect(envVariablesRepository.create).toHaveBeenCalledWith({
        field: 'DATABASE_URL',
        value: 'postgres://localhost:5432/mydb',
        serviceId: 1,
      });
    });
  });

  describe('called with BackEnd as key', () => {
    it('should create a new backend service', async () => {
      const service = {
        service_type: 'BackEnd',
        configurations: {
          numberOfReplicas: 2,
          name: 'backend',
          port: 4000,
        },
        customEnv: {
          field: 'DATABASE_URL',
          value: 'postgres://localhost:5432/mydb',
        },
      };
      const projectId = 1;

      projectServiceConfigRepository.create.mockResolvedValue({ id: 1 });
      backendServiceRepository.create.mockResolvedValue({ id: 1 });
      envVariablesRepository.create.mockResolvedValue({ id: 1 });

      const serviceId = await repositoryServiceObj.BackEnd(service, projectId);

      expect(serviceId).toBe(1);
      expect(projectServiceConfigRepository.create).toHaveBeenCalledWith({
        serviceType: 'BackEnd',
        projectId,
      });
      expect(backendServiceRepository.create).toHaveBeenCalledWith({
        numberOfReplicas: 2,
        name: 'backend',
        port: 4000,
        serviceId: 1,
      });
      expect(envVariablesRepository.create).toHaveBeenCalledWith({
        field: 'DATABASE_URL',
        value: 'postgres://localhost:5432/mydb',
        serviceId: 1,
      });
    });
  });

  describe('called with Database as key', () => {
    it('should do nothing', async () => {
      const result = await repositoryServiceObj.Database();
      expect(result).toBeUndefined();
    });
  });

});

