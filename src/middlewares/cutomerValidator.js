const httpConstants = require('http2').constants;
const schemas = require('../schemas/index.schema');

const validationSchema = (validateSchema) => {
  return (req, res, next) => {
    const { error } = schemas[validateSchema]().validate(req.query);
    if (!error) {
      next();
    }
    else {
      res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).json({ message: 'Error! Check query parameter' });
    }
  };
};

module.exports = { validationSchema };