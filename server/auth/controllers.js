const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const secretKey = "my_jwt_secret";

// Регистрация пользователя
exports.register = async (req, res) => {
  const { first_name, last_name, email, password, position_id } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      position_id: 1,
      balance: 0,
      auth_status: false,
    });

    res.status(201).json({ message: "Регистрация успешна", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    const payload = {
      user_id: user.user_id,
      email: user.email,
      position_id: user.position_id,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({ message: "Авторизация успешна", token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};
