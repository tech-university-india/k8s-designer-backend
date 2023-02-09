const httpConstants = require('http2').constants;
const controllers = require('../../src/controllers/customer.controller');
const services = require('../../src/services/customer.services');

describe('Test for Controller', () => {
  describe('Test GET /ping API', () => {
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    describe('To fetch data of all users', () => {
      const mockReq = {
        query: {
          customerId: null
        }
      };
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
          },];
        jest.spyOn(services, 'getCustomersData').mockResolvedValue(mockResult);
        await controllers.getCustomerOrderDetails(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_OK);
        expect(mockRes.json).toBeCalledWith(mockResult);
      });
      it('Should return 404 if no data returned', async () => {
        jest.spyOn(services, 'getCustomersData').mockResolvedValue();
        await controllers.getCustomerOrderDetails(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_NOT_FOUND);
        expect(mockRes.json).toBeCalledWith({ message: 'No data found' });
      });
    });
    describe('To fetch data of single user', () => {
      it('Should return customer orders', async () => {
        const mockReq = {
          query: {
            customerId: 1
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
          },];
        jest.spyOn(services, 'getCustomerData').mockResolvedValue(mockResult);
        await controllers.getCustomerOrderDetails(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_OK);
        expect(mockRes.json).toBeCalledWith(mockResult);
      });
      it('Should return 404 if no data returned', async () => {
        const mockReq = {
          query: {
            customerId: 1280
          }
        };
        jest.spyOn(services, 'getCustomerData').mockResolvedValue();
        await controllers.getCustomerOrderDetails(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(httpConstants.HTTP_STATUS_NOT_FOUND);
        expect(mockRes.json).toBeCalledWith({ message: 'No user data found' });
      });
    });
  });
});