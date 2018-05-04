
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', table => {
    table.increments();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.integer('donation_id').references('donations.id');
    table.integer('user_id').references('users.id');
    table.boolean('seen').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notifications');
};
