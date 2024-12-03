"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Positions",
      [
        {
          position_name: "Worker",
          base_salary: 200000,
        },
        {
          position_name: "Admin",
          base_salary: 400000,
        },
        {
          position_name: "Security",
          base_salary: 300000,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Positions", null, {});
  },
};
