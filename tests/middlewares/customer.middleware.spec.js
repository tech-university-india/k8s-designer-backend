const { validationTest } = require('../../src/middlewares/cutomer.middleware');
const httpConstants = require('http2').constants;

describe('Validate Middleware', () => {
  it('Should move to next middleware if valid', () => {
    const mockReq = {
      query: {
        customerId: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    validationTest(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });

  it('Should give error message if invalid query parameter', () => {
    const mockReq = {
      query: {
        customerId: 'string',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    validationTest(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_BAD_REQUEST);
    expect(mockRes.json).toBeCalledWith({
      message: 'Error! Check query parameter'
    });
  });

  it('Should give error message if query parameter', () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    validationTest(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });
});