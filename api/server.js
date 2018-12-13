
const express = require('express');
const cors = require('cors')
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')
const {checkDataBase, wikiWare, authentication, generateToken, getPhoto  } = require('./middleware.js')
const db = knex(knexConfig.development)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const infoBox = require('wiki-infobox')
const server = express();
server.use(cors())
server.use(express.json())

  sendUserError = (message, res) => {
    res.status(422)
    res.json({Error: message})
    return;
  }

///////
//sanity-test endpoints
//////
// server.get('/api/celebrity_data', (req, res) => {
//   res.status(200).json('this is working.')
// })

// server.get('/api/dead_or_alive', (req, res) => {
  // res.status(200).json('this is working, too')
// })


///////
//user endpoints
//////





server.post('/api/register', (req, res) => {
    const creds = req.body
   // console.log(req.body)
  const {username, password} = req.body
    if(!username ||  !password ) {
      sendUserError("Username or password are invalid", res)
    } else {
      //the 2 is just for dev purposes, in real life the number needs to be higher
    const hash = bcrypt.hashSync(creds.password, 2)
    creds.password = hash
    db('users').insert(creds).then(id => {
      res.status(201).json(id)
    }).catch(err => res.status(500).json({message: "Status 500"}))
    }
} )

server.post('/api/login', (req, res) => {
  const creds = req.body
  db('users').where({username: creds.username}).first()
  .then(user => {
     console.log(user)
    if(user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({message: 'welcome user', token, user_id: user.id})
    } else {
      sendUserError("You are not logged in", res)
    }
  }).catch(err => res.status(500).json({message: "Something went wrong"}))
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


///////
//quiz endpoints
//////
//POST
server.post('/api/user/:id/quiz', authentication, (req, res) => {
  const userId = req.params.id
  const { name} = req.body
    if(name.length >= 1) {
      db('quiz').insert({name: name, user_id: userId}).then(id => {
        res.status(201).json(id)
      })
    } else {
      res.status(422).json({message: "The name can't be blank"})
    }
})

//GET///
server.get('/api/quiz/:quizId', (req, res) => {
  // select * from celebQuiz
  //   inner join (celebrity) on celebrity.id = celebQuiz.celeb_id
  //   where celebQuiz.quiz_id = 2
  let quizId = req.params.quizId
  db('celebQuiz').innerJoin('celebrity', 'celebrity.id', 'celebQuiz.celeb_id').where('celebQuiz.quiz_id', quizId)
  .then(celebData => res.status(200).json(celebData))
  .catch(err => res.status(500).json({message: "We aren't able to get the quiz at this time"}))
})

//GET///
server.get('/api/quizzes', (req, res) => {
    // db.select("*").count('celebQuiz.celeb_id').from('quiz').innerJoin('celebQuiz', 'quiz.id', 'celebQuiz.quiz_id').groupBy('quiz.id')
    // .then(quizzes => res.status(200).json(quizzes))
  db.select().table('quiz')
    .then(allQuizzes => {
      res.status(200).json(allQuizzes)
    })
    .catch(error => res.status(500).json({message: "Can't get the list of quizzes at this time", error}))

})


//POST///
server.post('/api/quiz/:id', authentication, (req, res) => {
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

///////
//celebrity endpoints
////////
//POST//
server.post('/api/celebrity', authentication, checkDataBase, wikiWare, getPhoto, (req, res) => {
  db('celebrity').insert(req.body).then(id => {
      res.status(200).json(id[0])
  }).catch(err => {
    res.status(500).json({message: "Celebrity not added to database", err})
  })
})

//GET//
server.get('/api/celebrity/:id', (req, res) => {
  const celebId = req.params.id
  db('celebrity').where({id: celebId})
    .then(data => res.status(200).json(data))
    .catch(err => status(500).json({err}))
})



module.exports = server;
