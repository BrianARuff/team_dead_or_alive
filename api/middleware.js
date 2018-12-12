const knex = require('knex')
const knexConfig = require('./knexfile.js')
const jwt = require('jsonwebtoken');
const infoBox = require('wiki-infobox')
const db = knex(knexConfig.development)

authentication = (req, res, next) => {
  const token = req.get('Authorization')
    if(token) {
      jwt.verify(token, 'dead_or_alive', (err, decoded) => {
        if(err) {
          res.status(401).json({message: "invalid token"})
        } else {
          req.decodedToken = decoded
          next()
        }
      })
    } else {
      return res.status(401).json({message: "No token provided, must be set on authorization header"})
    }
}

checkDataBase = (req, res, next) => {
  const name = req.body.name
  db('celebrity').where('name', name)
  .then(name => {
    if(name.length === 0) {
      next()
    } else {
      res.status(200).json(name)
    }
  })
  .catch(error => {
    res.status(500).json({message: 'there was problem getting celebrity'})

  })
}

wikiWare = (req, res, next) => {
  const name = req.body.name
    infoBox(name, 'en', (err, data) => {
      if(err) {
        res.status(500).json({message: 'We got an error from the API'})
      } else {
        req.body.name = data.name.value
        // const bDay = data.birth_date.value.replace(/\D/g, ' ').trim()
        req.body.date_of_birth = data.birth_date.value
        req.body.image_link = data.image.value
        if('death_date' in data) {
          // console.log('death date', data.death_date)
         // const death_day = data.death_date.value.replace(/\D/g, ' ').trim()
         req.body.date_of_death = true 
        } else {
          req.body.date_of_death = null 
        }
       next()
     }
    })
}


module.exports = {
  checkDataBase,
  wikiWare,
  authentication




}
