exports.up = function(knex, Promise) {
  console.log("creating articles table .... ");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.text("body");
    articlesTable.integer("vote").defaultTo(0); // deafult to zero
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log("droping articles table...");
  return knex.schema.dropTable("articles");
};
