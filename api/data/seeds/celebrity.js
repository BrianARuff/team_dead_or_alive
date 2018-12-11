
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('celebrity').del()
    .then(function () {
      // Inserts seed entries
      return knex('celebrity').insert([
        { id: 1, name: "Betty White", date_of_birth: "January 17, 1922", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 2, name: "Stan Lee", date_of_birth: "December 28, 1922", date_of_death: "November 12, 2018", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 3, name: "Alec Baldwin", date_of_birth: "April 3, 1958", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 4, name: "Samwise Gamgee", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 5, name: "Frodo Baggins", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 6, name: "Santa Clauze", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 7, name: "Yoko Ono", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 8, name: "Paul McCartney", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 9, name: "John Lennon", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 10, name: "Ringo Starr", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 11, name: "George Harrison", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},

      ]);
    });
};
