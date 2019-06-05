const usersRouter = require("express").Router();
const { sendUserByUsername } = require("../controllers/send-users");

usersRouter.route("/:username").get(sendUserByUsername);

module.exports = usersRouter;
