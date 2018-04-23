
exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods', (table) => {
    table.increments('id');
    table.string('name');
    table.float('price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods');
};
