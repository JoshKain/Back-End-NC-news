const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors");
const { psqlErrors, customErrors } = require("./errors/custom-errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(psqlErrors);

app.use(customErrors);

app.all("/*", routeNotFound);

app.use(handle500);

module.exports = app;
