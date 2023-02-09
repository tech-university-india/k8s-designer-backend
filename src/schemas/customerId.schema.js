const joi = require('joi');
const customerIdSchema = () => joi.object({
  customerId: joi.number()
});

module.exports = { customerIdSchema };