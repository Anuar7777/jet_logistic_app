const { User, Position } = require("../../models");
const { validationResult } = require("express-validator");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["user_id", "first_name", "last_name", "email"],
      include: [
        {
          model: Position,
          attributes: ["position_name"],
        },
      ],
    });

    res.json(
      users.map((user) => ({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        position_name: user.Position ? user.Position.position_name : null,
      }))
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении пользователей", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
        "auth_status",
        "balance",
      ], // поля пользователя
      include: [
        {
          model: Position,
          attributes: ["position_name"], // поле position_name из модели Position
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      position_name: user.Position.position_name,
      balance: user.balance,
      auth_status: user.auth_status,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении пользователя", error });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id, {
      include: [
        {
          model: Position,
          attributes: ["position_name"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      balance: user.balance,
      position_name: user.Position.position_name,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении профиля", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, auth_status, position_name } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (auth_status !== undefined) user.auth_status = auth_status;

    if (position_name) {
      const position = await Position.findOne({
        where: { position_name },
      });

      if (!position) {
        return res.status(404).json({ message: "Позиция не найдена" });
      }

      user.position_id = position.position_id; 
    }

    await user.save(); 

    res.json({
      message: "Данные пользователя успешно обновлены",
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        auth_status: user.auth_status,
        position_name: position_name || user.Position.position_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении пользователя", error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getProfile,
  updateUser,
};
