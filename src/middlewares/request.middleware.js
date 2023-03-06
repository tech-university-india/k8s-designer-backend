const httpConstants = require('http2').constants;

const validate = (requestSchema) => {
    return (req, res, next) => {
        const { error } = requestSchema.validate(req.params);
        if (!error) {
            next();
        }
        else {
            res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).json({ message: 'Error! Check query parameter' });
        }
    };
};

module.exports = { validate };