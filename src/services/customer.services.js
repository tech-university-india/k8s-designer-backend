const data = require('../../input.json');

const getCustomersData = () => data.log;

const getCustomerData = customerId => {
  for (const record of data.log) {
    if (record.customerId == customerId) {
      return record;
    }
  }
};

module.exports = { getCustomersData, getCustomerData };