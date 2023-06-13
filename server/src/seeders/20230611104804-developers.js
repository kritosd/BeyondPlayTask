'use strict';
const { v4: uuidv4 } = require('uuid')

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
    await queryInterface.bulkInsert('Developers', [{
        id: uuidv4(),
        name: 'Albereto Summers',
        email: 'albereto@beyondplay.io',
        RoleId: 1,
        StatusId: 1,
        TeamId: 1
      },
      {
        id: uuidv4(),
        name: 'Gina Brady',
        email: 'gina@beyondplay.io',
        RoleId: 1,
        StatusId: 1,
        TeamId: 1
    },
    {
        id: uuidv4(),
        name: 'Jody Rice',
        email: 'jody@beyondplay.io',
        RoleId: 2,
        StatusId: 2,
        TeamId: 2
    },
    {
        id: uuidv4(),
        name: 'Kay Sandoval',
        email: 'kay@beyondplay.io',
        RoleId: 2,
        StatusId: 3,
        TeamId: 3
    },
    {
        id: uuidv4(),
        name: 'Willis Daniel',
        email: 'willis@beyondplay.io',
        RoleId: 2,
        StatusId: 1,
        TeamId: 1
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Developers', null, {});
  }
};
