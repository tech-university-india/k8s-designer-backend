const data = require('../../input.json');

const getOrderData = () => data.log;

const getCustomerData = customerId => {
  return data.log.filter((record) => {
    if (record.customerId == customerId) {
      return record;
    }
  });
};

const createUser=(body)=>{
  // const {body}

};
module.exports = { getOrderData, getCustomerData ,createUser};