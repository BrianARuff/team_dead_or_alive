
exports.up = function(knex, Promise) {
  return knex.schema.createTable('celebrity', table => {
    table.increments()
    table.string('name').notNullable().unique()
    table.string('date_of_birth').notNullable()
    table.string('date_of_death')
    table.string('image_link')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('celebrity');
};
