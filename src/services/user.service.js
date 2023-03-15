const data = require('../../input.json');
const httpError = require('../exceptions/user.exception');
const userRepositoryService = require('../repositories/user.repositories');
const passwordUtil = require('../utility/password.util');
const jwtUtil = require('../utility/jwt.util');

const getOrderData = () => data.log;

const getCustomerData = customerId => {
  return data.log.filter((record) => {
    if (record.customerId == customerId) {
      return record;
    }
  });
};

const createUser = async (name, email, password) => {
  const hashedPassword = await passwordUtil.hashPassword(password);
  const newUser = await userRepositoryService.createUser({ fullName: name, email, password: hashedPassword });
  if(!newUser) {
    throw new httpError('Unable to create user', 400);
  }
  return {
    message: 'USER CREATED SUCCEFULLY',
  };
};

const loginUser = async (email, password) => {
  const existingUser = await userRepositoryService.getUserDetail(email);
  if(!existingUser) {
    throw new httpError('User doesnot exists', 400);
  }
  const checkPassword = await passwordUtil.comparePassword(password, existingUser.password);
  if(!checkPassword) {
    throw new httpError('Incorrect Password', 400);
  }
  const token = await jwtUtil.signToken({ id: existingUser.id, name: existingUser.name, email: existingUser.email });
  return `Bearer ${token}`;
};

const validateUser = async (token) => {
  const verifiedToken = await jwtUtil.verifyToken(token);
  if(!verifiedToken) {
    throw new httpError('Unauthorize User', 401);
  }
  return { message: 'Authorize User' };
};

module.exports = { getOrderData, getCustomerData , createUser, loginUser, validateUser };