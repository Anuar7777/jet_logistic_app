"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("root", 10); // Хешируем пароль один раз

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: "Аман",
          last_name: "Ануар",
          email: "admin@logistic.com",
          password: hashedPassword,
          position_id: 2, 
          balance: 777777,
          auth_status: true,
          created_at: new Date(),
        },
        {
          first_name: "Ахметов",
          last_name: "Олжас",
          email: "ahmetov_olzhas@logistic.com",
          password: hashedPassword,
          position_id: 3,
          balance: 0,
          auth_status: true,
          created_at: new Date(),
        },
        {
          first_name: "Серік",
          last_name: "Бейназар",
          email: "serik_beinazar@logistic.com",
          password: hashedPassword,
          position_id: 1,
          balance: 0,
          auth_status: true,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
