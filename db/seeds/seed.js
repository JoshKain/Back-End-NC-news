const {
  articlesData,
  usersData,
  commentsData,
  topicsData
} = require("../data/index");
const { formatTimestamp } = require("../../utils/convert-timestamp");

exports.seed = (knex, Promise) => {
  console.log("seeding ........");
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("topics").insert(topicsData))
    .then(() => knex("users").insert(usersData))
    .then(() => {
      return knex("articles")
        .insert(formatTimestamp(articlesData, "created_at"))
        .returning("*");
    })
    .then(() => {
      console.log(commentsData);
      return knex("comments")
        .insert(formatTimestamp(commentsData, "created_at"))
        .returning("*");
    })
    .then(console.log);
};
