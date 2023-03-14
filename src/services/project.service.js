
const repositoryServiceObj = require('../utility/projects.utils');

const generateProject = async (data) =>{
  const {services} = data;

  services.forEach(async (service)=>{
    repositoryServiceObj[service.service_type](service);
  });
  
  return data;
  
};

module.exports = {generateProject};