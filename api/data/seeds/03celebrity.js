
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('celebrity').del()
    .then(function () {
      // Inserts seed entries
      return knex('celebrity').insert([
        { id: 1, name: "Betty White", date_of_birth: "January 17, 1922", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Betty_White_2010.jpg/800px-Betty_White_2010.jpg"},
        {id: 2, name: "Stan Lee", date_of_birth: "December 28, 1922", date_of_death: "November 12, 2018", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Stan_Lee_by_Gage_Skidmore_3.jpg/330px-Stan_Lee_by_Gage_Skidmore_3.jpg"},
        {id: 3, name: "Alec Baldwin", date_of_birth: "April 3, 1958", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Alec_Baldwin_by_Gage_Skidmore.jpg/800px-Alec_Baldwin_by_Gage_Skidmore.jpg"},
        {id: 4, name: "Samwise Gamgee", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://vignette.wikia.nocookie.net/lotr/images/2/20/Sam.jpg/revision/latest?cb=20070623123241"},
        {id: 5, name: "Frodo Baggins", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://vignette.wikia.nocookie.net/lotr/images/5/54/Untitledjk.png/revision/latest?cb=20130313174543"},
        {id: 6, name: "Santa Clauze", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://imgix.ranker.com/user_node_img/113/2247489/original/tim-allen-photo-u29?w=650&q=50&fm=jpg&fit=crop&crop=faces"},
        {id: 7, name: "Yoko Ono", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Yokoono2.jpg/330px-Yokoono2.jpg"},
        {id: 8, name: "Paul McCartney", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Paul_McCartney_-_Out_There_Concert_-_140420-5941-jikatu_%2813950091384%29.jpg/330px-Paul_McCartney_-_Out_There_Concert_-_140420-5941-jikatu_%2813950091384%29.jpg"},
        {id: 9, name: "John Lennon", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/John_Lennon_rehearses_Give_Peace_A_Chance_cropped.jpg/330px-John_Lennon_rehearses_Give_Peace_A_Chance_cropped.jpg"},
        {id: 10, name: "Ringo Starr", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Ringo_Starr_and_all_his_band_%288470866906%29.jpg/330px-Ringo_Starr_and_all_his_band_%288470866906%29.jpg"},
        {id: 11, name: "George Harrison", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/George_Harrison_1974_edited.jpg/330px-George_Harrison_1974_edited.jpg"},

      ]);
    });
};
