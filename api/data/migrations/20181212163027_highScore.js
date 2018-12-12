
exports.up = function(knex, Promise) {
  return knex.schema.createTable('highScores', table => {
    table.increments()
    table.integer('high_score')
    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
    table.integer('quiz_id')
      .unsigned()
      .references('id')
      .inTable('quiz')
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('highScores');
};
