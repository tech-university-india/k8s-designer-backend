const services = require('../services/app');
const httpError = require('../utils/customError');

const getData = async (req, res) => {
  try {
    //fetch single user data
    if (req.query.customerId) {
      const userData = await services.getUserData(req.query.customerId);
      if (userData === undefined) throw new httpError('No user data found', 404);
      res.status(200).json(userData);
    }

    //fetch all users data
    else {
      const data = await services.getData();
      if (data === undefined) throw new httpError('No data found', 404);
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { getData };