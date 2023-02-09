const services = require('../services/customer.services');
const httpError = require('../exceptions/customError');
const httpConstants = require('http2').constants;

const getCustomerOrderDetails = async (req, res) => {
  try {
    //fetch single user data
    if (req.query.customerId) {
      const customerData = await services.getCustomerData(req.query.customerId);
      if (customerData.length === 0) throw new httpError('No user data found', httpConstants.HTTP_STATUS_NOT_FOUND);
      res.status(httpConstants.HTTP_STATUS_OK).json(customerData);
    }

    //fetch all users data
    else {
      const allCustomersdata = await services.getCustomersData();
      if (allCustomersdata === undefined) throw new httpError('No data found', httpConstants.HTTP_STATUS_NOT_FOUND);
      res.status(httpConstants.HTTP_STATUS_OK).json(allCustomersdata);
    }
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { getCustomerOrderDetails };