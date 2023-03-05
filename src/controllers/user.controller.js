const services = require('../services/user.service');
const httpError = require('../exceptions/user.exception');
const httpConstants = require('http2').constants;

const getOrderDetails = async (req, res) => {
  try {
    //fetch all orders information
    const allCustomersdata = await services.getOrderData();
    if (allCustomersdata === undefined) throw new httpError('No data found', httpConstants.HTTP_STATUS_NOT_FOUND);
    res.status(httpConstants.HTTP_STATUS_OK).json(allCustomersdata);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

const getCustomerOrderDetails = async (req, res) => {
  try {
    //fetch single user data
    const customerData = await services.getCustomerData(req.params.customer_id);
    if (customerData.length === 0) throw new httpError('No user data found', httpConstants.HTTP_STATUS_NOT_FOUND);
    res.status(httpConstants.HTTP_STATUS_OK).json(customerData);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

const postNewUser= async(req,res)=>{
  try{
    const body = req.body;
    const result = services.postUser(body);
    res.send(result);
  }
  catch(err){
    if (err instanceof httpError) {
      return res.status(err.code).send({ message: err.message });
    }
    res.status(500).send(err.message);
  }
};

module.exports = { getOrderDetails, getCustomerOrderDetails,postNewUser };