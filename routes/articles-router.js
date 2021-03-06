const articlesRouter = require("express").Router();
const { sendArticleByArticle_id } = require("../controllers/send-article");
const { addNewComment } = require("../controllers/add-comment");
const {
  sendCommentsByArticle_id
} = require("../controllers/send-comments-by-article_id");
const {
  deleteArticleByArticle_id
} = require("../controllers/delete-article-by-article-id");
const { sendAllArticles } = require("../controllers/send-all-articles");
const { methodNotAllowed } = require("../errors/index");
const { addNewArticle } = require("../controllers/add-article");

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .post(addNewArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticle_id)
  .patch(sendArticleByArticle_id)
  .delete(deleteArticleByArticle_id)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .post(addNewComment)
  .get(sendCommentsByArticle_id)
  .all(methodNotAllowed);

module.exports = articlesRouter;
