// const models = require('../../prisma/schema.prisma');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const setMicroservicesConfigService = async (data) =>{
  const {services} = data;

  services.forEach(async (service)=>{
    switch(service.service_type)
    {
    case 'FrontEnd':
    {
      const {service_type,configurations,customEnv} = service;
      const frontendServicesResult = await prisma.FrontendService.create(
        {data:
          {reactVersion:configurations.reactVersion, 
            numberOfReplicas:configurations.numberOfReplicas, 
            name:configurations.name, 
            port:configurations.port}
        }
      );

      const frontendServicesId =  frontendServicesResult.id;
      
      const envVariablesResult = await prisma.EnvVariables.create(
        {data:
          {field:customEnv.field,
            value:customEnv.value, 
            frontendServicesId
          }});

      const projectServiceConfigResult = await prisma.ProjectServiceConfig.create(
        {data:
          {
            serviceType:service_type,
            serviceId:frontendServicesId,
            //Considered dummy static value for project Id as Project Id has to be taken from JWT token
            projectId:'3df6bbd4-de24-465c-9080-1b3673d1d742' 
          }
        }
      );

      //return projectServiceConfigResult;
    }
    }
  });

  return data;
  
};

module.exports = {setMicroservicesConfigService};