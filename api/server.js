
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

  duplicateUser = (req, res, next) => {
    const {username, password} = req.body
    db('users').where({username: creds.username}).first()
    .then(user => {
      if(user.username === username) {
        res.status(500).json({message: "There is already a user registered by that name"})
      } else {
        next()
      }
    })

  }

  //test data 
  //
  //

  // server.get('/api/celeb', )

  const data = [
    {name: "Betty White", dob: "January 17, 1922", dod: null, image: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
    {name: "Heath Ledger", dob: "April 4, 1979", dod: "January 22, 2008" , image: "https://en.wikipedia.org/wiki/Heath_Ledger#/media/File:Heath_Ledger_(Berlin_Film_Festival_2006)_revised.jpg"},
    {name: "Wilford Brimley", dob: "September 27, 1934", dod: null, image: "https://en.wikipedia.org/wiki/Wilford_Brimley#/media/File:Wilford_Brimley.jpg"},
    {name: "Stan Lee", dob: "December 28, 1922", dod: "November 12, 2018", image: "https://en.wikipedia.org/wiki/Stan_Lee#/media/File:Stan_Lee_by_Gage_Skidmore_3.jpg"}, ]


// Json token generator
//
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

// console.log(generateToken({id: 99, username: 'hello'}))

server.get('/', (req, res) => {
  res.status(200).json('working!')
})

server.get('/api/dead_or_alive', (req, res) => {
  //send data with a few items. Name. birthdate. Image link, dead boolean? Brief info? .
  res.status(200).json(data)
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
