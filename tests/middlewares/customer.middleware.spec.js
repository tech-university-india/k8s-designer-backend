const { validate } = require('../../src/middlewares/request.middleware');
const httpConstants = require('http2').constants;
const schemas = require('../../src/schemas/index.schema');

describe('Validate Middleware', () => {
  describe('Validate customer Schema', () => {
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    it('Should move to next middleware if valid', () => {
      const mockReq = {
        params: {
          customer_id: 1
        }
      };
      validate(schemas.customerSchema)(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });

    it('Should give error message if query parameter is of invalid type', () => {
      const mockReq = {
        params: {
          customer_id: 'string',
        },
      };
      validate(schemas.customerSchema)(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_BAD_REQUEST);
      expect(mockRes.json).toBeCalledWith({
        message: 'Error! Check query parameter'
      });
    });

    it('Should give error message if no query parameter passed', () => {
      const mockReq = {
        params: {}
      };
      validate(schemas.customerSchema)(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });
  });
});