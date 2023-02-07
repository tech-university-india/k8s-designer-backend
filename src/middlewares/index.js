const joi = require('joi');

const querySchema = joi.object({
  customerId: joi.number()
});

const validationTest = (req, res, next) => {
  const { error } = querySchema.validate(req.query);
  if (!error) {
    next();
  }
  else {
    res.status(400).json({ message: 'Error! Check query parameter' });
  }
};

module.exports = { validationTest };