const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors");
const { psqlErrors, customErrors } = require("./errors/custom-errors");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(psqlErrors);

app.use(customErrors);

app.all("/*", routeNotFound);

app.use(handle500);

module.exports = app;
