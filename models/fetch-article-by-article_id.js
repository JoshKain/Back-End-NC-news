const connection = require("../db/connection");

exports.fetchArticleByArticle_id = ({ article_id, num }) => {
  return connection
    .select("articles.*")
    .count("comment_id AS comment_count")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id.article_id)
    .modify(query => {
      if (num.inc_Votes !== undefined)
        query.increment("votes", num.inc_Votes || 0).returning("*");
    })
    .returning("*");
};
