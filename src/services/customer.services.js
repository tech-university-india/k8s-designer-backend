const data = require('../../input.json');
const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


const getUsers = async () => {
  try{
    const users = await prisma.user.findMany();
    console.log(users);
    return users;
  }
  catch(err){
    console.log(err);
  }
};
const getCustomersData = () => data.log;

const getCustomerData = customerId => {
  return data.log.filter((record) => {
    if (record.customerId == customerId) {
      return record;
    }
  });
};


module.exports = { getCustomersData, getCustomerData ,getUsers};