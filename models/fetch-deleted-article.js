const connection = require("../db/connection");

exports.fetchArticleToBeDeleted = ({ article_id }) => {
  return connection
    .select("*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .del("*")
    .returning("*");
};
