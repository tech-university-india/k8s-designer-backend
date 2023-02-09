const services = require('../services/customer.services');
const httpError = require('../Validations/customError');

const getCustomerOrderDetails = async (req, res) => {
  try {
    //fetch single user data
    if (req.query.customerId) {
      const customerData = await services.getCustomerData(req.query.customerId);
      if (customerData === undefined) throw new httpError('No user data found', 404);
      res.status(200).json(customerData);
    }

    //fetch all users data
    else {
      const allCustomersdata = await services.getCustomersData();
      if (allCustomersdata === undefined) throw new httpError('No data found', 404);
      res.status(200).json(allCustomersdata);
    }
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { getCustomerOrderDetails };