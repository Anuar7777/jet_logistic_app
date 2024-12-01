module.exports = (sequelize, DataTypes) => {
  const Compensation = sequelize.define(
    "Compensation",
    {
      compensation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      shift_id: DataTypes.INTEGER,
      reason: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
    },
    {
      tableName: "Compensations",
      timestamps: false,
    }
  );

  Compensation.associate = function (models) {
    Compensation.belongsTo(models.User, { foreignKey: "user_id" });
    Compensation.belongsTo(models.Shift, { foreignKey: "shift_id" });
  };

  return Compensation;
};
