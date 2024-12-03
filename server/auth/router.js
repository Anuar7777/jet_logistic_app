const express = require("express");
const { register, login } = require("./controllers");
const { body, validationResult } = require("express-validator");
const passport = require("./config");

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/register",
  [
    body("first_name").notEmpty().withMessage("Имя обязательно"),
    body("email")
      .notEmpty()
      .withMessage("Email обязателен")
      .isEmail()
      .withMessage("Неверный формат email"),
    body("password")
      .notEmpty()
      .withMessage("Пароль обязателен")
      .isLength({ min: 8, max: 100 })
      .withMessage("Пароль должен быть от 8 до 100 символов"),
  ],
  handleValidationErrors,
  register
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email обязателен")
      .isEmail()
      .withMessage("Неверный формат email"),
    body("password")
      .notEmpty()
      .withMessage("Пароль обязателен")
      .isLength({ max: 100 })
      .withMessage("Некорректный пароль"),
  ],
  handleValidationErrors,
  login
);

module.exports = router;
