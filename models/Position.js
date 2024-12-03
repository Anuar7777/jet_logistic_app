module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define(
    "Position",
    {
      position_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position_name: DataTypes.STRING,
      base_salary: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "Positions",
    }
  );

  Position.associate = function (models) {
    Position.hasMany(models.User, { foreignKey: "position_id" });
    models.User.belongsTo(Position, { foreignKey: "position_id" });
  };

  return Position;
};
