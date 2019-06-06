const commentsRouter = require("express").Router();

const {
  sendCommentByComment_id
} = require("../controllers/send-comment-by-comment_id");
const {
  deleteCommentByComment_id
} = require("../controllers/delete-comment-by-comment_id");

const { routeNotFound, methodNotAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(sendCommentByComment_id)
  .delete(deleteCommentByComment_id)
  .all(methodNotAllowed);
commentsRouter.all("/*", routeNotFound);

module.exports = commentsRouter;
