const commentsRouter = require("express").Router();

const { addNewComment } = require("../controllers/add-comment");

commentsRouter.route("/comments").post(addNewComment);

module.exports = commentsRouter;
