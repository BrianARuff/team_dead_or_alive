
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('quiz').del()
    .then(function () {
      // Inserts seed entries
      return knex('quiz').insert([
        {id: 1, name: 'LoTR', user_id: 1},
        {id: 2, name: 'TV Stars', user_id: 1},
        {id: 3, name: 'Film Stars', user_id: 1},
        {id: 4, name: 'Authors', user_id: 2},
        {id: 5, name: 'Comic Celebs', user_id: 2},
        {id: 6, name: 'Celebs as Fictional peeps', user_id: 3},
        {id: 7, name: 'Golden Girls', user_id: 3},
        {id: 8, name: '70s Stars', user_id: 3},
        {id: 9, name: 'Sports', user_id: 4},
        {id: 10, name: 'Politics', user_id: 4}
      ]);
    });
};
