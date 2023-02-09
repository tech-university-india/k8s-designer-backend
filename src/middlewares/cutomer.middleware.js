const joi = require('joi');
const httpConstants = require('http2').constants;

const querySchema = joi.object({
  customerId: joi.number()
});

const validationTest = (req, res, next) => {
  const { error } = querySchema.validate(req.query);
  if (!error) {
    next();
  }
  else {
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).json({ message: 'Error! Check query parameter' });
  }
};

module.exports = { validationTest };