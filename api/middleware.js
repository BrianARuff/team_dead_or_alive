const knex = require('knex')
const knexConfig = require('./knexfile.js')
const infoBox = require('wiki-infobox')
const db = knex(knexConfig.development)


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
        const bDay = data.birth_date.value.replace(/\D/g, ' ').trim()
        req.body.date_of_birth = new Date(bDay)
        req.body.image_link = data.image.value
        if('death_date' in data) {
          // console.log('death date', data.death_date)
         // const death_day = data.death_date.value.replace(/\D/g, ' ').trim()
         req.body.date_of_death = true 
        } else {
          req.body.date_of_death = false 
        }
       next()
     }
    })
}


module.exports = {
  checkDataBase,
  wikiWare




}
