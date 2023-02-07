const data = require('../../input.json');

const getData = () => data.log;

const getUserData = customerId => {
  for (const record of data.log) {
    if (record.customerId == customerId) {
      return record;
    }
  }
};

module.exports = { getData, getUserData };