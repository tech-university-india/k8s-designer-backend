
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const create=async (data)=>{
  const frontendServicesResult = await prisma.FrontendService.create(
    {data }
  );

  return frontendServicesResult;
};

module.exports = {create};