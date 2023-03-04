
const prisma = require('../config/prisma.config');

const create=async (data)=>{
  try{
    const projectServiceConfigResult = await prisma.ProjectServiceConfig.create(
      {data }
    );
    return projectServiceConfigResult;
  }catch(e){
    console.log(e);
    throw new Error('Error creating ProjectServiceConfig: ',{cause:e});
  }
 
};


module.exports = {create}; 