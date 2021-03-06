require('dotenv').config()
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const jwt = require('jsonwebtoken');
const infoBox = require('wiki-infobox')
const wtf = require('wtf_wikipedia')
const jwtKey = process.env.JWT_KEY;
const environment = process.env.NODE_ENV || "development";
const db = knex(knexConfig[environment])


generateToken = (user) => {
  console.log('KEY' + jwtKey);
  const payload = {
    subject: user.id,
    username: user.username
  }

  const secret = process.env.JWT_KEY

  const options = {
    expiresIn: '99hr'
  }

  return jwt.sign(payload, secret, options)
}

authentication = (req, res, next) => {
  const token = req.get('Authorization')
    if(token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
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
      // console.log(name[0].id)
      res.status(200).json(name[0].id)
    }
  })
  .catch(error => {
    res.status(500).json({message: 'there was problem getting celebrity'})

  })
}
getPhoto = (req, res, next) => {
  const name = req.body.name
    wtf.fetch(name).then(data => {
      req.body.image_link = data.images(0).thumb()
      next()
    })
}



wikiWare = (req, res, next) => {
  const name = req.body.name
    infoBox(name, 'en', (err, data) => {
      if(err) {
        res.status(500).json({message: 'We got an error from the API'})
      } else {
        if(data.name === undefined) {
            res.status(500).json({message: "That name isn't working with the api", name: req.body.name})
        } else {
          req.body.name = data.name.value
          console.log(data.birth_date);
          req.body.date_of_birth = data.birth_date.value
          req.body.image_link = "https://commons.wikimedia.org/wiki/File:" + data.image.value.split(' ').join('_')
          if('death_date' in data && data.death_date.value.length > 0) {
           req.body.date_of_death = true
          } else {
            req.body.date_of_death = null
          }
         next()
        }
     }
    })
}


module.exports = {
  checkDataBase,
  wikiWare,
  authentication,
  generateToken,
  getPhoto




}
