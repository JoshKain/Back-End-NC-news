const connection = require("../db/connection");

exports.countOfArticles = (author, topic) => {
  return connection("articles")
    .modify(query => {
      if (author) {
        query.where("articles.author", "=", author);
      }
      if (topic) {
        query.where("articles.topic", "=", topic);
      }
    })
    .count()
    .first()
    .then(count => {
      return count;
    });
};
