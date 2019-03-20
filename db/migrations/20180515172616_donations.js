exports.up = function(knex, Promise) {
  return knex.schema.createTable("donations", table => {
    table.increments();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.string("title").notNull();
    table.text("description").notNull();
    table.text("pictureUrl");
    table
      .integer("user_id")
      .references("users.id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("donations");
};
