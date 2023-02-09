const data = require('../../input.json');

const getCustomersData = () => data.log;

const getCustomerData = customerId => {
  return data.log.filter((record) => {
    if (record.customerId == customerId) {
      return record;
    }
  });
};


module.exports = { getCustomersData, getCustomerData };