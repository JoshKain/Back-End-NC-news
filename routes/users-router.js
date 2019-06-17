const usersRouter = require("express").Router();
const { sendUserByUsername } = require("../controllers/send-users");
const { methodNotAllowed } = require("../errors/index");
const { addUser } = require("../controllers/add-user");
const { sendAllUsers } = require("../controllers/send-all-users");

usersRouter
  .route("/")
  .post(addUser)
  .get(sendAllUsers)
  .all(methodNotAllowed);

usersRouter
  .route("/:username")
  .get(sendUserByUsername)
  .all(methodNotAllowed);

module.exports = usersRouter;
