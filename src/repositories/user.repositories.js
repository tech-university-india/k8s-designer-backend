const httpError = require('../exceptions/user.exception');
const prisma = require('../config/prisma.config');

const createUser = async (data)=>{
  try{
    const newUser = await prisma.user.create({ data });
    return newUser;
  }catch(error){
    throw new httpError('Unable to create new User', 400);
  }
};

const getUserDetail = async (email) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email: email } });
    return existingUser;
  } catch (error) {
    console.log(error);
    throw new httpError('Error in Login', 400);
  }
};


module.exports = { createUser, getUserDetail }; 