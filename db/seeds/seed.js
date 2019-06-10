const {
  articlesData,
  usersData,
  commentsData,
  topicsData
} = require("../data/index");
const { formatTimestamp } = require("../../utils/convert-timestamp");
const {
  createRef,
  formatBelongToKey,
  formatData
} = require("../../utils/format-comments");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("topics").insert(topicsData))
    .then(() => knex("users").insert(usersData))
    .then(() => {
      return knex("articles")
        .insert(formatTimestamp(articlesData, "created_at"))
        .returning("*")
        .then(articles => {
          const ref = createRef(articles, "title", "article_id");
          const comments = formatBelongToKey(
            commentsData,
            "created_by",
            "author"
          );
          const formatedData = formatData(comments, ref);
          const final = formatBelongToKey(
            formatedData,
            "belongs_to",
            "article_id"
          );
          return knex("comments")
            .insert(formatTimestamp(final, "created_at"))
            .returning("*");
        });
    });
};
