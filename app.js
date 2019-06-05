const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const psqlCodes = ["22P02"];
  if (psqlCodes.includes(err.code)) {
    res.status(400).send(err.text || "Bad Request");
  } else if (err.code === "23503") {
    res.status(404).send("Invalid username input");
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send(err.msg);
  } else if (err.status === 400) {
    res.status(err.status).send(err.msg);
  } else next(err);
});

app.all("/*", routeNotFound);

app.use(handle500);

module.exports = app;
