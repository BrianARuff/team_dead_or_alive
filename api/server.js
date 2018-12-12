
const express = require('express');
const cors = require('cors')
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')
const middleware = require('./middleware.js')
const db = knex(knexConfig[environment])
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const infoBox = require('wiki-infobox')
const server = express();
server.use(cors())
server.use(express.json())



server.get('/api/celebrity_data', (req, res) => {

  res.status(200).json([
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

  ])
})

server.get('/api/dead_or_alive', (req, res) => {
  //send data with a few items. Name. birthdate. Image link, dead boolean? Brief info? .
  res.status(200).json([
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

  ])
})


server.get('/api/user/:id', authentication,  (req, res) => {
  db.select('id', 'username', 'score').from('users').where('id', req.params.id)
    .then(user => {
      res.status(201).json(user)
    })
  .catch(error => {
      res.status(500).json({message: "We can't access your user info at this time"})
  })

})


server.post('/api/quiz', authentication, (req, res) => {
  const {user_id, name} = req.body
    if(name.length >= 1) {
      db('quiz').insert(req.body).then(id => {
        res.status(201).json(id)
      })
    } else {
      res.status(422).json({message: "The name can't be blank"})
    }

})





server.post('/api/register', (req, res) => {
   console.log(req.body)
  const {username, password} = req.body
    if(username.length >= 1 && password.length >= 1) {
    const creds = req.body
      //the 2 is just for dev purposes, in real life the number needs to be higher
    const hash = bcrypt.hashSync(creds.password, 2)
    creds.password = hash
    db('users').insert(creds).then(id => {
      res.status(201).json(id)
    }).catch(err => res.status(500).json({message: "Status 500"}))
    } else {
      res.status(422).json({message: "username or password are invalid."})
    }
} )

server.post('/api/login', (req, res) => {
  const creds = req.body
  db('users').where({username: creds.username}).first()
  .then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)) {
      const token = middleware.generateToken(user)
      res.status(200).json({message: 'welcome user', token})
    } else {
      res.status(422).json({message: "you are not logged in"})
    }
  }).catch(err => res.status(500).json({message: "Something went wrong"}))
})

server.post('/api/celebrity', middleware.authentication, middleware.checkDataBase, middleware.wikiWare, (req, res) => {
  db('celebrity').insert(req.body).then(id => {
      res.status(200).json(id)
  }).catch(err => {
    res.status(500).json({message: "Celebrity not added to database", err})
  })
})

server.get('/api/celebrity/:id', (req, res) => {
  const celebId = req.params.id
  db('celebrity').where({id: celebId})
    .then(data => res.status(200).json(data))
    .catch(err => status(500).json({err}))
})

server.get('/api/quiz/:quizId', (req, res) => {
  // select * from celebQuiz
  //   inner join (celebrity) on celebrity.id = celebQuiz.celeb_id
  //   where celebQuiz.quiz_id = 2
  let quizId = req.params.quizId
  db('celebQuiz').innerJoin('celebrity', 'celebrity.id', 'celebQuiz.celeb_id').where('celebQuiz.quiz_id', quizId)
  .then(celebData => res.status(200).json(celebData))
  .catch(err => res.status(500).json({message: "We aren't able to get the quiz at this time"}))
})

server.get('/api/quizzes', (req, res) => {
  db.select().table('quiz')
    // db('quiz').where('id', 2
    .then(allQuizzes => {
      res.status(200).json(allQuizzes)
    })
    .catch(error => res.status(500).json({message: "Can't get the list of quizzes at this time", error}))

})

server.post('/api/quiz/:id', middleware.authentication, (req, res) => {
  const celebArray = req.body.celebId
    celebArray.forEach(item => {
      db('celebQuiz').insert({celeb_id: item, quiz_id: req.params.id})
        .then(response => {
          res.status(201).json(response)
        })
      .catch(error => {
          res.status(400).json({message: "Cannot add quiz elements"})
      })
    })
})


module.exports = server;
