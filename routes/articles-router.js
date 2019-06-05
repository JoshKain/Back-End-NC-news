const articlesRouter = require("express").Router();
const { sendArticleByArticle_id } = require("../controllers/send-article");
const commentsRouter = require("./comments-router");
articlesRouter
  .route("/:article_id")
  .get(sendArticleByArticle_id)
  .patch(sendArticleByArticle_id);
//   .all("/*", (res, req, next) => {
//     next({ status: 405, msg: "Route not found" });
//   });
articlesRouter.use("/:article_id", commentsRouter);

module.exports = articlesRouter;
