const services = require('../../src/services/project.service.js');

const frontendServiceRepository = require('../../src/repositories/frontendService.repositories.js');
const envVariablesRepository = require('../../src/repositories/envVariables.repositories.js');
const projectServiceConfigRepository = require('../../src/repositories/projectServiceConfig.repositories.js');

describe('microservices  service  testing', () => {
  it('should populate microservice table ', async () => {

    jest.spyOn(frontendServiceRepository,'create').mockResolvedValueOnce({
      'id':1,
      'reactVersion': '2.08',
      'numberOfReplicas':5,
      'name':'React Todo App',
      'port':'5432'
    });
    jest.spyOn(envVariablesRepository,'create').mockResolvedValueOnce({
      'id':2,
      'field': 'port',
      'value':'2345',
      'frontendServicesId':1
    });
    jest.spyOn(projectServiceConfigRepository,'create').mockResolvedValueOnce({
      'id':3,
      'serviceType':'FrontEnd',
      'serviceId':1,
      'envVariablesId':2
    });


    const mockreq = {body:{'services':[
      {
        'service_type': 'FrontEnd',
        'configurations':{
          'reactVersion': '2.08',
          'port':'5432',
          'numberOfReplicas':5,
          'name':'React Todo App'
        },
        'customEnv':{
          'field': 'port',
          'value':'2345'
        }
      }
    ]}};
    const mockres = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const result = await services.setMicroservicesConfigService(mockreq.body);
    // expect(mockFsCreate).toHaveBeenCalledTimes(1);
    expect(result).toEqual({'services':[
      {
        'service_type': 'FrontEnd',
        'configurations':{
          'reactVersion': '2.08',
          'port':'5432',
          'numberOfReplicas':5,
          'name':'React Todo App'
        },
        'customEnv':{
          'field': 'port',
          'value':'2345'
        }
      }
    ]});
  });
});


