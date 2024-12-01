"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Positions", {
      position_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position_name: Sequelize.STRING,
      base_salary: Sequelize.INTEGER,
    });

    await queryInterface.createTable("Users", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: Sequelize.STRING,
      position_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Positions",
          key: "position_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      balance: Sequelize.INTEGER,
      auth_status: Sequelize.BOOLEAN,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable("Shifts", {
      shift_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_time: Sequelize.DATE,
      end_time: Sequelize.DATE,
      shift_type: Sequelize.STRING,
      status: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("Shift_Users", {
      shift_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Shifts",
          key: "shift_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    await queryInterface.createTable("Compensations", {
      compensation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      shift_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Shifts",
          key: "shift_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reason: Sequelize.STRING,
      amount: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
    });

    await queryInterface.createTable("Timesheets", {
      timesheet_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      shift_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Shifts",
          key: "shift_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      check_in_time: Sequelize.DATE,
      check_out_time: Sequelize.DATE,
      break_time: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.createTable("Payments", {
      payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount: Sequelize.INTEGER,
      status: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
    await queryInterface.dropTable("Timesheets");
    await queryInterface.dropTable("Compensations");
    await queryInterface.dropTable("Shift_Users");
    await queryInterface.dropTable("Shifts");
    await queryInterface.dropTable("Users");
    await queryInterface.dropTable("Positions");
  },
};
