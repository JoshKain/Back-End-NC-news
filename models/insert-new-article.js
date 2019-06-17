const connection = require("../db/connection");

exports.insertNewArticle = article => {
  return connection
    .insert(article)
    .into("articles")
    .returning("*");
};
