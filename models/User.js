module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
      position_id: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      auth_status: DataTypes.BOOLEAN,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "Users",
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Position, { foreignKey: "position_id" });
    User.belongsToMany(models.Shift, {
      through: "Shift_User",
      foreignKey: "user_id",
    });
    User.hasMany(models.Compensation, { foreignKey: "user_id" });
    User.hasMany(models.Timesheet, { foreignKey: "user_id" });
    User.hasMany(models.Payment, { foreignKey: "user_id" });
  };

  return User;
};
