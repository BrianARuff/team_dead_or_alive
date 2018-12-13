
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'BrianRuff', password: 'password', score: 10},
        {id: 2, username: 'ChadJemmett', password: 'password', score: 10},
        {id: 3, username: 'JonathanHeinz', password: 'password', score: 100000},
        {id: 4, username: 'MichaelLanders', password: 'password', score: 10},
      ]);
    });
};
