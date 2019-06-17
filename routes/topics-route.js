const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/send-topics");
const { routeNotFound, methodNotAllowed } = require("../errors/index");
const { addTopic } = require("../controllers/add-topic");

topicsRouter
  .route("/")
  .get(sendTopics)
  .post(addTopic)
  .all(methodNotAllowed);

topicsRouter.all("/*", routeNotFound);

module.exports = topicsRouter;
