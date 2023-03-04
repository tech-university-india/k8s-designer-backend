// const services = require('../src/services/microservices.config.service');
const services = require('../../src/services/project.service');
const controller = require('../../src/controllers/project.controller');


// jest.mock('../../src/services/microservices.config.service');

describe('microservices controller testing', () => {
  it('should populate microservice table ', async () => {
   
    jest.spyOn(services, 'setMicroservicesConfigService').mockResolvedValue({'services':[
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
    await controller.setMicroServicesConfig(mockreq, mockres);
    expect(mockres.status).toHaveBeenCalledWith(200);
    expect(mockres.json).toHaveBeenCalledWith({
      data:{'services':[
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
      ]},
      success:true
    });
  });

  it('should return error when service throw error ', async () => {
   
    jest.spyOn(services, 'setMicroservicesConfigService').mockRejectedValue(new Error('error'));    
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
    await controller.setMicroServicesConfig(mockreq, mockres);
    expect(mockres.status).toHaveBeenCalledWith(500);
    expect(mockres.json).toHaveBeenCalledWith({
      data:'error'
    });
  });
});