
const express = require('express');
const cors = require('cors')
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const infoBox = require('wiki-infobox')
const server = express();
server.use(cors())
server.use(express.json())
 
  const wikiWare = (req, res, next) => {

    infoBox(page, lang, (err, data) => {
      if(err) {
        res.status(500).json({message: 'We got an error from the API'})
      } else {
        req.wikidata = data
        next()
      }
    })
  }

  // duplicateUser = (req, res, next) => {
  //   const {username, password} = req.body
  //   db('users').where({username: creds.username}).first()
  //   .then(user => {
  //     if(user.username === username) {
  //       res.status(500).json({message: "There is already a user registered by that name"})
  //     } else {
  //       next()
  //     }
  //   })

  // }


const data = [
        { id: 1, name: "Betty White", date_of_birth: "January 17, 1922", date_of_death: null, image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 2, name: "Stan Lee", date_of_birth: "December 28, 1922", date_of_death: "November 12, 2018", image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 3, name: "Alec Baldwin", date_of_birth: "April 3, 1958", date_of_death: null, image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 4, name: "Samwise Gamgee", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 5, name: "Frodo Baggins", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 6, name: "Santa Clauze", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 7, name: "Yoko Ono", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 8, name: "Paul McCartney", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 9, name: "John Lennon", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 10, name: "Ringo Starr", date_of_birth: "April 3, 1000", date_of_death: null, image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
        {id: 11, name: "George Harrison", date_of_birth: "April 3, 1000", date_of_death: "April 3, 1100", image_link: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
]


  generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username
    }

    const secret = 'dead_or_alive' 

    const options = {
      expiresIn: '99hr'
    }

    return jwt.sign(payload, secret, options)
  }

authentication = (req, res, next) => {
  console.log(req.body)
  const token = req.get('Authorization')
  next()

}

// console.log(generateToken({id: 99, username: 'hello'}))

server.get('/api/celebrity_data', (req, res) => {
  res.status(200).json(data)
})

server.get('/api/dead_or_alive', (req, res) => {
  //send data with a few items. Name. birthdate. Image link, dead boolean? Brief info? .
  res.status(200).json(data)
})


server.get('/api/user/:id', authentication,  (req, res) => {
  res.status(201).json('working')



})

server.post('/api/register', (req, res) => {
  // console.log(req.body)
  const {username, password} = req.body
    if(username.length >= 1 && password.length >= 1) {
    const creds = req.body
      //the 2 is just of dev purposes
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
      const token = generateToken(user)
      res.status(200).json({message: 'welcome user', token})
    } else {
      res.status(422).json({message: "you are not logged in"})
    }
  }).catch(err => res.status(500).json({message: "Something went wrong"}))
})

// server.get('/api/celebrities', (req, res) => {


// })


module.exports = server;
