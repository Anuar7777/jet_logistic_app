module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define(
    "Shift",
    {
      shift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      shift_type: DataTypes.STRING,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      tableName: "Shifts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Shift.associate = function (models) {
    Shift.belongsToMany(models.User, {
      through: "Shift_User",
      foreignKey: "shift_id",
    });
    Shift.hasMany(models.Compensation, { foreignKey: "shift_id" });
    Shift.hasMany(models.Timesheet, { foreignKey: "shift_id" });
  };

  return Shift;
};
