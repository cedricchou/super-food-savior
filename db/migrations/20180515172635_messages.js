exports.up = function(knex, Promise) {
  return knex.schema.createTable("messages", table => {
    table.increments();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.text("content").notNull();
    table
      .integer("donation_id")
      .references("donations.id")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("users.id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("messages");
};
