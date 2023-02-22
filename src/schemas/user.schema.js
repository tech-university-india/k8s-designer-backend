const joi = require('joi');
const customerSchema = joi.object({
  customer_id: joi.number()
});

module.exports = { customerSchema };