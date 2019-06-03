exports.up = function(knex, Promise) {
  console.log("creating comments table .... ");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0); // deafult to zero
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body");
  });
};

exports.down = function(knex, Promise) {
  console.log("droping comments table...");
  return knex.schema.dropTable("comments");
};
