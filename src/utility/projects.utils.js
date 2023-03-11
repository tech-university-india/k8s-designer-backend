
const projectServiceConfigRepository = require('../repositories/projectServiceConfig.repositories');
const envVariablesRepository = require('../repositories/envVariables.repositories');
const frontendServiceRepository = require('../repositories/frontendService.repositories');
const projectRepository = require('../repositories/project.repositories');


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
      
            {userId:'c2ed1118-a016-4140-9c19-dd7eee774071'}
        
        );
      
        const projectId =  projectResult.id;

        const projectServiceConfigResult = await projectServiceConfigRepository.create(
            {
                serviceType:service_type,
                serviceId:frontendServicesId,
                projectId:projectId 
            }
      
        );
          
        return projectServiceConfigResult;
    },

    BackEnd: ()=>{},
    Database: ()=>{}
};

module.exports = repositoryServiceObj;