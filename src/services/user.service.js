const data = require('../../input.json');

const getOrderData = () => data.log;

const getCustomerData = customerId => {
    return data.log.filter((record) => {
        if (record.customerId == customerId) {
            return record;
        }
    });
};

// eslint-disable-next-line no-unused-vars
const createUser=(body)=>{
    // const {body}

};
module.exports = { getOrderData, getCustomerData ,createUser};