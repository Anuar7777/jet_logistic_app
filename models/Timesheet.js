module.exports = (sequelize, DataTypes) => {
  const Timesheet = sequelize.define(
    "Timesheet",
    {
      timesheet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      shift_id: DataTypes.INTEGER,
      check_in_time: DataTypes.DATE,
      check_out_time: DataTypes.DATE,
      break_time: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: "Timesheets",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Timesheet.associate = function (models) {
    Timesheet.belongsTo(models.User, { foreignKey: "user_id" });
    Timesheet.belongsTo(models.Shift, { foreignKey: "shift_id" });
  };

  return Timesheet;
};
