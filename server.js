const express = require("express");
const app = express();

PORT = 3000;

app.get("/", (req, res) => {
  res.send("Сервер Jet Logistics запущен");
});

app.listen(PORT, () => {
  console.log(`Сервер прослушивается на ${PORT}`);
});
