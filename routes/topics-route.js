const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/send-topics");
const { routeNotFound } = require("../errors/index");

topicsRouter.route("/").get(sendTopics);
topicsRouter.all("/*", routeNotFound);

module.exports = topicsRouter;
