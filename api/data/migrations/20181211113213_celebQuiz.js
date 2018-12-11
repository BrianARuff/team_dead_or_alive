
exports.up = function(knex, Promise) {
  return knex.schema.createTable('celebQuiz', table => {
    table.increments()
    table.integer('celeb_id')
      .unsigned()
      .references('id')
      .inTable('celebrity')
    table.integer('quiz_id')
     .unsigned()
     .references('id')
     .inTable('quiz')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('celebQuiz');
  
};
