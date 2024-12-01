module.exports = (sequelize, DataTypes) => {
  const Shift_User = sequelize.define(
    "Shift_User",
    {
      shift_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      tableName: "Shift_Users",
      timestamps: false,
    }
  );

  Shift_User.associate = function (models) {
    Shift_User.belongsTo(models.Shift, { foreignKey: "shift_id" });
    Shift_User.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Shift_User;
};
