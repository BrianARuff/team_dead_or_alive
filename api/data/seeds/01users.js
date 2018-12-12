
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'password', score: 10},
        {id: 2, username: 'user2', password: 'password', score: 10},
        {id: 3, username: 'user3', password: 'password', score: 10},
        {id: 4, username: 'user4', password: 'password', score: 10},
      ]);
    });
};
