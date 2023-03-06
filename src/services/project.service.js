// const models = require('../../prisma/schema.prisma');

const projectServiceConfigRepository = require('../repositories/projectServiceConfig.repositories');
const envVariablesRepository = require('../repositories/envVariables.repositories');
const frontendServiceRepository = require('../repositories/frontendService.repositories');
const projectRepository = require('../repositories/project.repositories');


const generateProject = async (data) =>{
    const {services} = data;
    const repositoryServiceObj = {
        FrontEnd: async (service)=>{
            const {service_type,configurations,customEnv} = service;
            const frontendServicesResult = await frontendServiceRepository.create(
      
                {reactVersion:configurations.reactVersion, 
                    numberOfReplicas:configurations.numberOfReplicas, 
                    name:configurations.name, 
                    port:configurations.port}
      
            );
            const frontendServicesId =  frontendServicesResult.id;
            // eslint-disable-next-line no-unused-vars
            const envVariablesResult = await envVariablesRepository.create(
                {field:customEnv.field,
                    value:customEnv.value, 
                    frontendServicesId
                });

            const projectResult = await projectRepository.create(
      
                {userId:'c2ed1118-a016-4140-9c19-dd7eee774079'}
        
            );
      
            const projectId =  projectResult.id;

            const projectServiceConfigResult = await projectServiceConfigRepository.create(
                {
                    serviceType:service_type,
                    serviceId:frontendServicesId,
                    //Considered dummy static value for project Id as Project Id has to be taken from JWT token
                    projectId:projectId 
                }
      
            );
            // await Promise.all([frontendServicesResult, envVariablesResult, projectServiceConfigResult]);
            //return projectServiceConfigResult;
            return projectServiceConfigResult;
        },
    
    
        BackEnd: ()=>{},
        Database: ()=>{}
    };
  
    services.forEach(async (service)=>{
        repositoryServiceObj[service.service_type](service);
        // switch(service.service_type)
        // {
        // case 'FrontEnd':
        // {
        //   const {service_type,configurations,customEnv} = service;
        //   const frontendServicesResult = await frontendServiceRepository.create(
      
        //     {reactVersion:configurations.reactVersion, 
        //       numberOfReplicas:configurations.numberOfReplicas, 
        //       name:configurations.name, 
        //       port:configurations.port}
      
        //   );
        //   const frontendServicesId =  frontendServicesResult.id;
        //   const envVariablesResult = await envVariablesRepository.create(
        //     {field:customEnv.field,
        //       value:customEnv.value, 
        //       frontendServicesId
        //     });
      

        //   const projectServiceConfigResult = await projectServiceConfigRepository.create(
        //     {
        //       serviceType:service_type,
        //       serviceId:frontendServicesId,
        //       //Considered dummy static value for project Id as Project Id has to be taken from JWT token
        //       projectId:'c2ed1118-a016-4140-9c19-dd7eee774077' 
        //     }
      
        //   );
        //   // await Promise.all([frontendServicesResult, envVariablesResult, projectServiceConfigResult]);
        //   //return projectServiceConfigResult;

    // }
    // }
    });
  
    return data;
  
};

module.exports = {generateProject};