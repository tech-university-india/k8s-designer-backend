---
to:  "<%= (databases.length > 0 ? (outputPath + '/' + appName + '/database/seeders/seed-data.js') : null) %>"
force: true
---
/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Colors', [
      {
        name: 'red',
        hex: '#ff0000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'green',
        hex: '#00ff00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'blue',
        hex: '#0000ff',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Colors', null, {});
  }
};
