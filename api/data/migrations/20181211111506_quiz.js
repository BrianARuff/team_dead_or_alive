
exports.up = function(knex, Promise) {
  return knex.schema.createTable('quiz', quiz => {
    quiz.increments()
    quiz
      .string('name', 128)
      .notNullable()
      .unique()
    quiz.integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
});
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quiz');
  
};
