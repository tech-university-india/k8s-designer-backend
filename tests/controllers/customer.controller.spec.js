const httpConstants = require('http2').constants;
const controllers = require('../../src/controllers/customer.controller');
const services = require('../../src/services/customer.service');

describe('Test for Controller', () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe('Test GET /ping API', () => {
    const mockReq = {};
    it('Should return customer orders', async () => {
      const mockResult = [
        {
          'customerId': 1,
          'order': {
            'snacks': [
              'Popcorn Chicken Small',
              'Boneless Strips 4 pc'
            ],
            'beverages': [
              'pepsi'
            ]
          },
          'isComplete': false
        }, {
          'customerId': 2,
          'order': {
            'snacks': [
              'Popcorn Chicken Medium'
            ],
            'beverages': []
          },
          'isComplete': false
        },];
      jest.spyOn(services, 'getOrderData').mockResolvedValue(mockResult);
      await controllers.getOrderDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_OK);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should return 404 if no data returned', async () => {
      jest.spyOn(services, 'getOrderData').mockResolvedValue();
      await controllers.getOrderDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_NOT_FOUND);
      expect(mockRes.json).toBeCalledWith({ message: 'No data found' });
    });
  });
  describe('Test GET /customers/:customer_id API', () => {
    it('Should return customer orders', async () => {
      const mockReq = {
        params: {
          customer_id: 1
        }
      };
      const mockResult = [
        {
          'customerId': 1,
          'order': {
            'snacks': [
              'Popcorn Chicken Small',
              'Boneless Strips 4 pc'
            ],
            'beverages': [
              'pepsi'
            ]
          },
          'isComplete': false
        }];
      jest.spyOn(services, 'getCustomerData').mockResolvedValue(mockResult);
      await controllers.getCustomerOrderDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_OK);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should return 404 if no data returned', async () => {
      const mockReq = {
        params: {
          customer_id: 1280
        }
      };
      const mockResult = [];
      jest.spyOn(services, 'getCustomerData').mockResolvedValue(mockResult);
      await controllers.getCustomerOrderDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_NOT_FOUND);
      expect(mockRes.json).toBeCalledWith({ message: 'No user data found' });
    });
  });
});