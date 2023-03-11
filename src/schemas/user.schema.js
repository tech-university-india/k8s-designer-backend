const joi = require('joi');
const userSchema = joi.object({
    user_id: joi.number()
});

module.exports = { userSchema };