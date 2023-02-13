const services = require('../../src/services/customer.service');

describe('Test for Services', () => {
  describe('Test GET API', () => {
    describe('To fetch data of all orders', () => {
      const serviceResponse = [
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
        },
        {
          'customerId': 2,
          'order': {
            'snacks': [
              'Rice Bowl with Chicken Popcorn'
            ],
            'beverages': []
          },
          'isComplete': false
        }
      ];
      it('Should return all orders', () => {
        expect(services.getOrderData()).toEqual(serviceResponse);
      });
    });

    describe('To fetch data of a single customer', () => {
      const serviceResponse = [{
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
      const customerId = 1;
      it(`Should return customer ${customerId} order`, () => {
        expect(services.getCustomerData(customerId)).toEqual(serviceResponse);
      });
    });
  });
});

