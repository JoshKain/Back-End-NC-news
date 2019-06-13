const connection = require("../db/connection");

exports.fetchArticles = ({
  sort_by,
  order,
  author,
  topic,
  limit = 10,
  p = 1
}) => {
  return connection
    .select("articles.*")
    .count("comment_id AS comment_count")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) {
        query.where("articles.author", "=", author);
      }
      if (topic) {
        query.where("articles.topic", "=", topic);
      }
    })

    .limit(limit)
    .offset((p - 1) * limit);
};
