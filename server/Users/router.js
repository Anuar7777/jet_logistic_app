const express = require("express");
const { body } = require("express-validator");
const {
  getAllUsers,
  getUserById,
  getProfile,
  updateUser,
} = require("./controllers");
const { isAdmin } = require("../auth/middlewares");
const passport = require("passport");

const router = express.Router();

// Валидация данных для обновления профиля
const updateUserValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("Имя пользователя не может быть пустым")
    .isLength({ max: 50 })
    .withMessage("Имя пользователя не должно превышать 50 символов"),

  body("last_name")
    .isLength({ max: 50 })
    .withMessage("Фамилия пользователя не должна превышать 50 символов"),

  body("auth_status")
    .isBoolean()
    .withMessage("auth_status должно быть булевым значением")
    .notEmpty()
    .withMessage("auth_status не может быть пустым"),
];

// Получить всех пользователей (доступно только админам)
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getAllUsers
);

// Получить пользователя по ID (доступно только админам)
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getUserById
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

// Обновить данные пользователя по ID
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserValidation,
  updateUser
);

module.exports = router;
