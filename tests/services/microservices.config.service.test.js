const { PrismaClient } = require('@prisma/client');
const services = require('../../src/services/microservices.config.service.js');

const prisma = new PrismaClient();

describe('microservices  service  testing', () => {
  it('should populate microservice table ', async () => {
    jest.mock('@prisma/client');
    jest.spyOn(prisma.FrontendService, 'create').mockResolvedValueOnce(
      {'id':1,
        'reactVersion': '2.08',
        'port':'5432',
        'numberOfReplicas':5,
        'name':'React Todo App'}
    );
    jest.spyOn(prisma.EnvVariables, 'create').mockResolvedValueOnce(
      {'id':2,
        'field': 'port',
        'value':'2345',
        'frontendServicesId':1}
    );
    jest.spyOn(prisma.ProjectServiceConfig, 'create').mockResolvedValueOnce(
      {
        'id':3,
        'serviceType':'FrontEnd',
        'serviceId':1,
        'projectId':'3df6bbd4-de24-465c-9080-1b3673d1d74'}

    );
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
    const result = await services.setMicroservicesConfigService(mockreq.body);
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

//     prisma.FrontendService.create.mockResolvedValueOnce(
//       {'reactVersion': '2.08',
//         'port':'5432',
//         'numberOfReplicas':5, 
//         'name':'React Todo App'}
//     );
//     prisma.EnvVariables.create.mockResolvedValueOnce(
//       {'field': 'port',
//         'value':'2345',
//         'frontendServicesId':1}
//     );
//     prisma.ProjectServiceConfig.create.mockResolvedValueOnce(
//       {'serviceType':'FrontEnd',
//         'serviceId':1,
//         'projectId':'3df6bbd4-de24-465c-9080-1b3673d1d74'}

//     );
//     const mockreq = {body:{'services':[
//       {
//         'service_type': 'FrontEnd',
//         'configurations':{
//           'reactVersion': '2.08',
//           'port':'5432',
//           'numberOfReplicas':5,
//           'name':'React Todo App'
//         },
//         'customEnv':{
//           'field': 'port',
//           'value':'2345'
//         }
//       }
//     ]}};
//     const result = await services.setMicroservicesConfigService(mockreq.body);
//     expect(result).toEqual({'services':[
//       {
//         'service_type': 'FrontEnd',
//         'configurations':{
//           'reactVersion': '2.08',
//           'port':'5432',
//           'numberOfReplicas':5,
//           'name':'React Todo App'

//         },
//         'customEnv':{
//           'field': 'port',
//           'value':'2345'
//         }
//       }
//     ]});
//   });



// jest.spyOn(services, 'setMicroservicesConfigService').mockResolvedValue({'services':[
//   {
//     'service_type': 'FrontEnd',
//     'configurations':{
//       'reactVersion': '2.08',
//       'port':'5432',
//       'numberOfReplicas':5,
//       'name':'React Todo App'
//     },
//     'customEnv':{
//       'field': 'port',
//       'value':'2345'
//     }
//   }
// ]});
// const mockreq = {body:{'services':[
//   {
//     'service_type': 'FrontEnd',
//     'configurations':{
//       'reactVersion': '2.08',
//       'port':'5432',
//       'numberOfReplicas':5,
//       'name':'React Todo App'
//     },
//     'customEnv':{
//       'field': 'port',
//       'value':'2345'
//     }
//   }
// ]}};
// const mockres = {
//   status: jest.fn().mockReturnThis(),
//   json: jest.fn(),
// };
// await controller.setMicroServicesConfig(mockreq, mockres);
// expect(mockres.status).toHaveBeenCalledWith(200);
// expect(mockres.json).toHaveBeenCalledWith({
//   data:{'services':[
//     {
//       'service_type': 'FrontEnd',
//       'configurations':{
//         'reactVersion': '2.08',
//         'port':'5432',
//         'numberOfReplicas':5,
//         'name':'React Todo App'
//       },
//       'customEnv':{
//         'field': 'port',
//         'value':'2345'
//       }
//     }
//   ]},
//   success:true
// });
