const services = require('../../src/services/app');

describe('Test for Services', () => {
  describe('Test GET API', () => {
    describe('To fetch data of all users', () => {
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
      it('Should return customer orders', () => {
        expect(services.getData()).toEqual(serviceResponse);
      });
    });

    describe('To fetch data of single user', () => {
      const serviceResponse = {
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
      };
      const customerId = 1;
      it(`Should return customer ${customerId} order`, () => {
        expect(services.getUserData(customerId)).toEqual(serviceResponse);
      });
    });
  });
});
