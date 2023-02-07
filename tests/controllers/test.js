const controllers = require('../../src/controllers/app');
const services = require('../../src/services/app');

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
        jest.spyOn(services, 'getData').mockResolvedValue(mockResult);
        await controllers.getData(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith(mockResult);
      });
      it('Should return 404 if no data returned', async () => {
        jest.spyOn(services, 'getData').mockResolvedValue();
        await controllers.getData(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(404);
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
        jest.spyOn(services, 'getUserData').mockResolvedValue(mockResult);
        await controllers.getData(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(200);
        expect(mockRes.json).toBeCalledWith(mockResult);
      });
      it('Should return 404 if no data returned', async () => {
        const mockReq = {
          query: {
            customerId: 1280
          }
        };
        jest.spyOn(services, 'getUserData').mockResolvedValue();
        await controllers.getData(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(404);
        expect(mockRes.json).toBeCalledWith({ message: 'No user data found' });
      });
    });
  });
});