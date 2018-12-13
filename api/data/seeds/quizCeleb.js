
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('celebQuiz').del()
    .then(function () {
      // Inserts seed entries
      return knex('celebQuiz').insert([
        {id: 1, celeb_id: 1, quiz_id: 2  },
        {id: 2, celeb_id: 2, quiz_id: 2  },
        {id: 3, celeb_id: 3, quiz_id: 2  },
        {id: 4, celeb_id: 4, quiz_id: 6  },
        {id: 5, celeb_id: 5, quiz_id: 6  },
        {id: 6, celeb_id: 6, quiz_id: 2  },
        {id: 7, celeb_id: 7, quiz_id: 2  },
        {id: 8, celeb_id: 8, quiz_id: 3  },
        {id: 9, celeb_id: 9, quiz_id: 3  },
        {id: 10, celeb_id: 10, quiz_id: 3  },
        {id: 11, celeb_id: 11, quiz_id: 3  },
        {id: 12, celeb_id: 2, quiz_id: 3  },
        {id: 13, celeb_id: 3, quiz_id: 3  },
        {id: 14, celeb_id: 1, quiz_id: 3  },
        {id: 15, celeb_id: 11, quiz_id: 8  },
        {id: 16, celeb_id: 2, quiz_id: 8  },
        {id: 17, celeb_id: 3, quiz_id: 8  },
        {id: 18, celeb_id: 1, quiz_id: 8  },
      ]);
    });
};
