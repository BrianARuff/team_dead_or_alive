
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('quiz').del()
    .then(function () {
      // Inserts seed entries
      return knex('quiz').insert([
        {id: 1, name: 'quiz 1', user_id: 1},
        {id: 2, name: 'quiz 2', user_id: 1},
        {id: 3, name: 'quiz 3', user_id: 1},
        {id: 4, name: 'quiz 4', user_id: 2},
        {id: 5, name: 'quiz 5', user_id: 2},
        {id: 6, name: 'quiz 6', user_id: 3},
        {id: 7, name: 'quiz 7', user_id: 3},
        {id: 8, name: 'quiz 8', user_id: 3},
        {id: 9, name: 'rowValue2', user_id: 4},
        {id: 10, name: 'rowValue3', user_id: 4}
      ]);
    });
};
