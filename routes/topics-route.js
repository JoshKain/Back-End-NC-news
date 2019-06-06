const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/send-topics");
const { routeNotFound, methodNotAllowed } = require("../errors/index");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(methodNotAllowed);
topicsRouter.all("/*", routeNotFound);

module.exports = topicsRouter;
