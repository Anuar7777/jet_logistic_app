const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./server/auth/config");
const { isAuth, isAdmin } = require("./server/auth/middlewares");
const authRoutes = require("./server/auth/router");
const userRoutes = require("./server/Users/router");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(passport.initialize()); 

app.get("/", (req, res) => {
  res.send("Сервер Jet Logistics запущен");
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  isAuth,
  (req, res) => {
    res.json({ message: "Доступ разрешен", user: req.user });
  }
);

app.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  isAuth,
  isAdmin,
  (req, res) => {
    res.json({ message: "Доступ разрешен для админа", user: req.user });
  }
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Сервер Jet Logistics запущен на порту ${PORT}`);
});
