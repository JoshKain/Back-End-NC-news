const articlesRouter = require("express").Router();
const { sendArticleByArticle_id } = require("../controllers/send-article");
const { addNewComment } = require("../controllers/add-comment");
const {
  sendCommentsByArticle_id
} = require("../controllers/send-comments-by-article_id");

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticle_id)
  .patch(sendArticleByArticle_id);
//   .all("/*", (res, req, next) => {
//     next({ status: 405, msg: "Route not found" });
//   });
articlesRouter
  .route("/:article_id/comments")
  .post(addNewComment)
  .get(sendCommentsByArticle_id);

module.exports = articlesRouter;
