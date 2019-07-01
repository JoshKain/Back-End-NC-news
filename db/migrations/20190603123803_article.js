exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.text("body");
    articlesTable.integer("votes").defaultTo(0); // default to zero
    articlesTable
      .string("topic")
      .references("topics.slug")
      .onDelete("CASCADE");
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable()
      .onDelete("CASCADE");
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
