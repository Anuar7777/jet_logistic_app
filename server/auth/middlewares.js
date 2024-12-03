exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Необходимо авторизоваться" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.position_id !== 2) {
    return res
      .status(403)
      .json({ message: "Доступ запрещен. Только для админов." });
  }
  next();
};

exports.isCorrectEmployee = (req, res, next) => {
  if (req.user.auth_status !== true) {
    return res
      .status(403)
      .json({ message: "Доступ запрещен. Свяжитесь с менеджером." });
  }
  next();
};
